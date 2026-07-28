"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendEmail, otpEmail, welcomeEmail } from "@/lib/resend";

function generateOtp(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

// ==================== SIGN UP ====================
export async function signUp(formData: {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: string;
  captchaToken?: string;
}) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      ...(formData.captchaToken ? { captchaToken: formData.captchaToken } : {}),
      data: {
        name: formData.name,
        phone: formData.phone || "",
        role: formData.role,
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  if (!data.user) {
    return { error: "Sign up failed — no user data returned" };
  }

  // Generate and store OTP
  const code = generateOtp();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  const adminClient = createAdminClient();
  await adminClient.from("verification_codes").insert({
    user_id: data.user.id,
    email: formData.email,
    code,
    type: "signup",
    expires_at: expiresAt.toISOString(),
  });

  // Send OTP via Resend
  const { subject, html } = otpEmail(formData.name, code);
  const emailResult = await sendEmail({ to: formData.email, subject, html });

  // Log security event (non-critical)
  try {
    await adminClient.from("security_logs").insert({
      user_id: data.user.id,
      event_type: "signup",
      metadata: { email: formData.email, role: formData.role },
    });
  } catch {}

  if (emailResult.error) {
    return {
      success: true,
      requiresVerification: true,
      message: `Account created! But we couldn't send the verification email (${emailResult.error}). Please use the Resend option on the verification page.`,
    };
  }

  // Always require verification when using our custom OTP
  return {
    success: true,
    requiresVerification: true,
    message: "Account created! Check your email for a verification code.",
  };
}

// ==================== SIGN IN ====================
export async function signIn(formData: {
  email: string;
  password: string;
  captchaToken?: string;
}) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
    ...(formData.captchaToken ? { options: { captchaToken: formData.captchaToken } } : {}),
  });

  if (error) {
    try {
      const adminClient = createAdminClient();
      await adminClient.from("security_logs").insert({
        event_type: "login_failed",
        metadata: { email: formData.email, error: error.message },
      });
    } catch {}
    return { error: error.message };
  }

  if (!data.user) {
    return { error: "Login failed — no user data returned" };
  }

  // Fetch profile (use maybeSingle to avoid crash)
  const { data: profile } = await supabase
    .from("profiles")
    .select("role, two_factor_enabled, two_factor_method")
    .eq("id", data.user.id)
    .maybeSingle();

  // Log successful login (non-critical)
  try {
    const adminClient = createAdminClient();
    await adminClient.from("security_logs").insert({
      user_id: data.user.id,
      event_type: "login",
    });
  } catch {}

  if (profile?.two_factor_enabled) {
    return {
      success: true,
      requires2FA: true,
      twoFactorMethod: profile.two_factor_method,
      redirectUrl: getRedirectUrl(profile?.role),
    };
  }

  return {
    success: true,
    redirectUrl: getRedirectUrl(profile?.role),
  };
}

// ==================== SIGN IN WITH OAUTH ====================
export async function signInWithGoogle(origin?: string) {
  const supabase = await createClient();
  const redirectTo = `${origin || process.env.NEXT_PUBLIC_APP_URL || "https://tourism-eight-bice.vercel.app"}/auth/callback`;
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo },
  });

  if (error) {
    return { error: error.message };
  }

  if (data.url) {
    redirect(data.url);
  }
}

export async function signInWithGithub(origin?: string) {
  const supabase = await createClient();
  const redirectTo = `${origin || process.env.NEXT_PUBLIC_APP_URL || "https://tourism-eight-bice.vercel.app"}/auth/callback`;
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: { redirectTo },
  });

  if (error) {
    return { error: error.message };
  }

  if (data.url) {
    redirect(data.url);
  }
}

// ==================== FORGOT PASSWORD ====================
export async function forgotPassword(formData: {
  email: string;
  captchaToken?: string;
}): Promise<{ success: boolean; message: string; error?: string }> {
  const adminClient = createAdminClient();

  // Generate and store OTP for password reset
  const code = generateOtp();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  // Find user name for the email
  try {
    const { data: authUsers } = await adminClient.auth.admin.listUsers();
    const authUser = authUsers?.users?.find((u) => u.email === formData.email);
    const userName = authUser?.user_metadata?.name || "there";

    await adminClient.from("verification_codes").insert({
      email: formData.email,
      code,
      type: "reset_password",
      expires_at: expiresAt.toISOString(),
    });

    // Send via Resend
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?code=${code}&email=${encodeURIComponent(formData.email)}`;
    const { subject, html } = (await import("@/lib/resend")).passwordResetEmail(
      userName,
      resetUrl
    );
    const emailResult = await sendEmail({ to: formData.email, subject, html });
    if (emailResult.error) {
      return { success: true, message: `If an account exists, a reset link has been sent. Note: ${emailResult.error}` };
    }
  } catch (emailError) {
    console.error("Failed to send reset email:", emailError);
  }

  return { success: true, message: "If an account exists, a reset link has been sent." };
}

// ==================== VERIFY OTP ====================
export async function verifyOtp(formData: { email: string; token: string; type: string }) {
  const adminClient = createAdminClient();

  // Look up the verification code
  const { data: codes, error: lookupError } = await adminClient
    .from("verification_codes")
    .select("id, user_id, code, type, expires_at, used")
    .eq("email", formData.email)
    .eq("code", formData.token)
    .eq("type", formData.type)
    .eq("used", false)
    .order("created_at", { ascending: false })
    .limit(1);

  if (lookupError || !codes || codes.length === 0) {
    try {
      await adminClient.from("security_logs").insert({
        event_type: "otp_failed",
        metadata: { email: formData.email, type: formData.type },
      });
    } catch {}
    return { error: "Invalid or expired verification code." };
  }

  const codeRecord = codes[0];

  // Check expiration
  if (new Date(codeRecord.expires_at) < new Date()) {
    return { error: "This code has expired. Please request a new one." };
  }

  // Mark as used
  await adminClient
    .from("verification_codes")
    .update({ used: true })
    .eq("id", codeRecord.id);

  // Log success
  try {
    await adminClient.from("security_logs").insert({
      user_id: codeRecord.user_id,
      event_type: "otp_verified",
      metadata: { type: formData.type },
    });
  } catch {}

  // If signup verification, confirm email in Supabase and send welcome email
  if (formData.type === "signup" && codeRecord.user_id) {
    // Confirm the user's email in Supabase (so they can log in)
    try {
      await adminClient.auth.admin.updateUserById(codeRecord.user_id, {
        email_confirm: true,
      });
    } catch (confirmError) {
      console.error("Failed to confirm email:", confirmError);
    }

    const { data: profile } = await adminClient
      .from("profiles")
      .select("name")
      .eq("id", codeRecord.user_id)
      .maybeSingle();

    try {
      const { subject, html } = welcomeEmail(profile?.name || "there");
      await sendEmail({ to: formData.email, subject, html });
    } catch {}

    const { data: roleProfile } = await adminClient
      .from("profiles")
      .select("role")
      .eq("id", codeRecord.user_id)
      .maybeSingle();

    return { success: true, redirectUrl: getRedirectUrl(roleProfile?.role) };
  }

  return { success: true, redirectUrl: "/auth/reset-password" };
}

// ==================== RESEND OTP ====================
export async function resendOtp(email: string, type: string) {
  const adminClient = createAdminClient();

  // Generate new code
  const code = generateOtp();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  // Invalidate old codes
  await adminClient
    .from("verification_codes")
    .update({ used: true })
    .eq("email", email)
    .eq("type", type)
    .eq("used", false);

  // Find user
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  await adminClient.from("verification_codes").insert({
    user_id: user?.id || null,
    email,
    code,
    type,
    expires_at: expiresAt.toISOString(),
  });

  // Send via Resend
  const userName = user?.user_metadata?.name || "there";
  const { subject, html } = otpEmail(userName, code);
  const emailResult = await sendEmail({ to: email, subject, html });

  if (emailResult.error) {
    return { error: `Failed to send email: ${emailResult.error}` };
  }

  return { success: true, message: "New verification code sent." };
}

// ==================== RESET PASSWORD ====================
export async function resetPassword(password: string) {
  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

// ==================== SIGN OUT ====================
export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/auth/login");
}

// ==================== GET USER ====================
export async function getUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function getProfile() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  return data;
}

// ==================== 2FA ====================
export async function toggle2FA(enabled: boolean, method: "totp" | "email" = "email") {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const adminClient = createAdminClient();
  const { error } = await adminClient
    .from("profiles")
    .update({
      two_factor_enabled: enabled,
      two_factor_method: enabled ? method : null,
    })
    .eq("id", user.id);

  if (error) return { error: error.message };
  return { success: true };
}

export async function send2FACode() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user?.email) return { error: "Not authenticated" };

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  // Store code in verification_codes
  const adminClient = createAdminClient();
  await adminClient
    .from("verification_codes")
    .update({ used: true })
    .eq("email", user.email)
    .eq("type", "2fa")
    .eq("used", false);

  await adminClient.from("verification_codes").insert({
    user_id: user.id,
    email: user.email,
    code,
    type: "2fa",
    expires_at: expiresAt.toISOString(),
  });

  // Send via Resend
  const userName = user.user_metadata?.name || "there";
  const { subject, html } = otpEmail(userName, code);
  const emailResult = await sendEmail({ to: user.email, subject, html });

  if (emailResult.error) {
    return { error: `Failed to send email: ${emailResult.error}` };
  }

  return { success: true };
}

export async function verify2FA(code: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user?.email) return { error: "Not authenticated" };

  const adminClient = createAdminClient();
  const { data: stored } = await adminClient
    .from("verification_codes")
    .select("*")
    .eq("email", user.email)
    .eq("type", "2fa")
    .eq("used", false)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!stored) return { error: "No verification code found. Request a new code." };
  if (stored.used) return { error: "Code already used" };
  if (new Date(stored.expires_at) < new Date()) return { error: "Code expired" };
  if (stored.code !== code) return { error: "Invalid code" };

  await adminClient
    .from("verification_codes")
    .update({ used: true })
    .eq("id", stored.id);

  // Get profile for redirect
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  return {
    success: true,
    redirectUrl: getRedirectUrl(profile?.role),
  };
}

// ==================== HELPERS ====================
function getRedirectUrl(role?: string): string {
  const roleRedirects: Record<string, string> = {
    admin: "/admin",
    company: "/company",
    driver: "/driver",
    tourist: "/vehicles",
  };
  return roleRedirects[role || "tourist"] || "/vehicles";
}
