"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import {
  Car,
  Loader2,
  User,
  Building2,
  ShieldCheck,
  Check,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import { registerSchema, type RegisterInput } from "@/lib/validations/auth";
import { signUp, signInWithGoogle, signInWithGithub } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

const roles = [
  {
    value: "tourist",
    label: "Tourist",
    icon: User,
    description: "Book vehicles for your Rwanda adventure",
  },
  {
    value: "company",
    label: "Company",
    icon: Building2,
    description: "List and manage your vehicle fleet",
  },
  {
    value: "driver",
    label: "Driver",
    icon: ShieldCheck,
    description: "Offer driving services to tourists",
  },
];

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: "At least 10 characters", met: password.length >= 10 },
    { label: "Contains a number", met: /[0-9]/.test(password) },
    { label: "Contains a symbol", met: /[^a-zA-Z0-9]/.test(password) },
  ];

  const strength = checks.filter((c) => c.met).length;
  const colors = ["bg-error", "bg-error", "bg-secondary", "bg-success"];
  const labels = ["Weak", "Fair", "Good", "Strong"];

  if (!password) return null;

  return (
    <div className="space-y-2">
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={cn(
              "h-1 flex-1 rounded-full transition-colors",
              i < strength ? colors[strength] : "bg-gray-200"
            )}
          />
        ))}
      </div>
      <p
        className={cn(
          "text-xs font-medium",
          strength === 3 ? "text-success" : strength >= 2 ? "text-secondary-dark" : "text-error"
        )}
      >
        {labels[strength]}
      </p>
      <div className="space-y-1">
        {checks.map((check) => (
          <div key={check.label} className="flex items-center gap-1.5 text-xs">
            {check.met ? (
              <Check className="w-3 h-3 text-success" />
            ) : (
              <X className="w-3 h-3 text-muted" />
            )}
            <span className={check.met ? "text-success" : "text-muted"}>
              {check.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<"google" | "github" | null>(null);
  const [captchaToken, setCaptchaToken] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: "tourist" },
  });

  const selectedRole = watch("role");
  const passwordValue = watch("password") || "";

  const onSubmit = async (data: RegisterInput) => {
    setLoading(true);
    try {
      const result = await signUp({
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
        role: data.role,
        captchaToken: captchaToken || undefined,
      });

      if (result.error) {
        toast("error", result.error);
        return;
      }

      toast("success", result.message || "Account created!");

      // If email verification is required, go to OTP page
      if (result.requiresVerification) {
        router.push(`/auth/verify-otp?email=${encodeURIComponent(data.email)}&type=signup`);
      } else {
        // Auto-signed in (email confirmation disabled) — go to dashboard
        router.push("/tourist");
      }
    } catch {
      toast("error", "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (provider: "google" | "github") => {
    setOauthLoading(provider);
    try {
      if (provider === "google") {
        await signInWithGoogle();
      } else {
        await signInWithGithub();
      }
    } catch {
      toast("error", `Failed to sign in with ${provider}`);
    } finally {
      setOauthLoading(null);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <Car className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold text-heading">Trekly</span>
          </Link>
          <h1 className="mt-6 text-2xl font-bold text-heading">Create Account</h1>
          <p className="mt-2 text-sm text-muted">
            Join Trekly and start exploring
          </p>
        </div>

        <div className="bg-card rounded-[16px] border border-gray-100 shadow-sm p-6">
          {/* OAuth Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => handleOAuth("google")}
              disabled={!!oauthLoading}
              className="flex items-center justify-center w-full h-11 px-4 border border-gray-200 rounded-[12px] text-sm font-medium text-heading hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              {oauthLoading === "google" ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  Continue with Google
                </>
              )}
            </button>

            <button
              onClick={() => handleOAuth("github")}
              disabled={!!oauthLoading}
              className="flex items-center justify-center w-full h-11 px-4 border border-gray-200 rounded-[12px] text-sm font-medium text-heading hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              {oauthLoading === "github" ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  Continue with GitHub
                </>
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-card text-muted">or register with email</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-heading mb-2">
                I want to
              </label>
              <div className="grid grid-cols-3 gap-2">
                {roles.map((role) => (
                  <label
                    key={role.value}
                    className={cn(
                      "flex flex-col items-center gap-2 p-3 border-2 rounded-[12px] cursor-pointer transition-all text-center",
                      selectedRole === role.value
                        ? "border-primary bg-primary/5"
                        : "border-gray-200 hover:border-gray-300"
                    )}
                  >
                    <input
                      type="radio"
                      value={role.value}
                      className="sr-only"
                      {...register("role")}
                    />
                    <role.icon
                      className={cn(
                        "w-6 h-6",
                        selectedRole === role.value ? "text-primary" : "text-muted"
                      )}
                    />
                    <span
                      className={cn(
                        "text-xs font-medium",
                        selectedRole === role.value ? "text-primary" : "text-body"
                      )}
                    >
                      {role.label}
                    </span>
                  </label>
                ))}
              </div>
              {errors.role && (
                <p className="mt-1 text-xs text-error">{errors.role.message}</p>
              )}
            </div>

            <Input
              label="Full Name"
              placeholder="John Doe"
              error={errors.name?.message}
              {...register("name")}
            />

            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              error={errors.email?.message}
              {...register("email")}
            />

            <Input
              label="Phone (optional)"
              type="tel"
              placeholder="+250 788 123 456"
              error={errors.phone?.message}
              {...register("phone")}
            />

            <div>
              <Input
                label="Password"
                type="password"
                placeholder="Create a strong password"
                error={errors.password?.message}
                {...register("password")}
              />
              <div className="mt-2">
                <PasswordStrength password={passwordValue} />
              </div>
            </div>

            <Input
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />

            {/* Terms */}
            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                className="mt-0.5 w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                {...register("agreeToTerms")}
              />
              <span className="text-xs text-body">
                I agree to the{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </span>
            </label>
            {errors.agreeToTerms && (
              <p className="text-xs text-error">{errors.agreeToTerms.message}</p>
            )}

            {/* hCaptcha — only render if site key is configured */}
            {process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY &&
              process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY !== "your-hcaptcha-site-key" && (
                <div className="flex justify-center">
                  <HCaptcha
                    sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY}
                    onVerify={(token) => setCaptchaToken(token)}
                    theme="light"
                  />
                </div>
              )}

            <Button type="submit" fullWidth loading={loading} size="lg">
              Create Account
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="font-medium text-primary hover:text-primary-dark transition-colors"
            >
              Log in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
