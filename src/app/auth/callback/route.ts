import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const roleRedirects: Record<string, string> = {
  tourist: "/tourist",
  company: "/company",
  admin: "/admin",
  driver: "/driver",
};

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next");

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      if (next) {
        return NextResponse.redirect(`${origin}${next}`);
      }

      const { data: { user } } = await supabase.auth.getUser();
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user?.id || "")
        .maybeSingle();

      const redirectPath = roleRedirects[profile?.role || "tourist"] || "/tourist";
      return NextResponse.redirect(`${origin}${redirectPath}`);
    }
  }

  return NextResponse.redirect(`${origin}/auth/login?error=auth_failed`);
}
