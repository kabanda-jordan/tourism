"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { Car, Mail, Loader2, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { forgotPasswordSchema, type ForgotPasswordInput } from "@/lib/validations/auth";
import { forgotPassword } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordInput) => {
    setLoading(true);
    try {
      const result = await forgotPassword({
        email: data.email,
        captchaToken: captchaToken || data.captchaToken,
      });

      if ("error" in result && result.error) {
        toast("error", result.error);
        return;
      }

      setSent(true);
      toast("success", result.message || "Reset code sent!");
    } catch {
      toast("error", "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="flex items-center justify-center min-h-[80vh] px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md text-center"
        >
          <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-primary/10">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          <h1 className="mt-6 text-2xl font-bold text-heading">Check Your Email</h1>
          <p className="mt-3 text-body">
            We&apos;ve sent a verification code to your email. Please check your inbox and enter the code.
          </p>
          <div className="mt-8 space-y-3">
            <Link href="/auth/verify-otp?type=recovery">
              <Button fullWidth>Enter Code</Button>
            </Link>
            <Button
              variant="ghost"
              fullWidth
              onClick={() => setSent(false)}
            >
              Try a different email
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <Car className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold text-heading">Trekly</span>
          </Link>
          <h1 className="mt-6 text-2xl font-bold text-heading">Forgot Password</h1>
          <p className="mt-2 text-sm text-muted">
            Enter your email and we&apos;ll send you a reset code
          </p>
        </div>

        <div className="bg-card rounded-[16px] border border-gray-100 shadow-sm p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              error={errors.email?.message}
              {...register("email")}
            />

            {/* hCaptcha */}
            <div className="flex justify-center">
              <HCaptcha
                sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || ""}
                onVerify={(token) => setCaptchaToken(token)}
                theme="light"
              />
            </div>

            <Button type="submit" fullWidth loading={loading} size="lg">
              Send Reset Code
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/auth/login"
              className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary-dark transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
