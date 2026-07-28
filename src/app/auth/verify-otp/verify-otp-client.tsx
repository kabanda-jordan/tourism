"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Car, ArrowLeft, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import { verifyOtp, resendOtp } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

const CODE_LENGTH = 8;

export default function VerifyOTPClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const type = searchParams.get("type") || "signup";
  const { toast } = useToast();

  const [code, setCode] = useState(Array(CODE_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendCooldown]);

  const sanitize = (val: string) => val.toUpperCase().replace(/[^A-Z0-9]/g, "");

  const handleChange = (index: number, value: string) => {
    const cleaned = sanitize(value);
    if (cleaned.length > 1) {
      const newCode = [...code];
      const chars = cleaned.slice(0, CODE_LENGTH).split("");
      chars.forEach((char, i) => {
        if (index + i < CODE_LENGTH) newCode[index + i] = char;
      });
      setCode(newCode);
      const nextIndex = Math.min(index + chars.length, CODE_LENGTH - 1);
      inputRefs.current[nextIndex]?.focus();
      if (newCode.every((d) => d !== "")) {
        handleVerifyWithCode(newCode.join(""));
      }
      return;
    }

    const newCode = [...code];
    newCode[index] = cleaned.slice(0, 1);
    setCode(newCode);
    if (cleaned && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
    if (newCode.every((d) => d !== "")) {
      handleVerifyWithCode(newCode.join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyWithCode = useCallback(async (fullCode: string) => {
    if (fullCode.length !== CODE_LENGTH) {
      toast("error", `Please enter the complete ${CODE_LENGTH}-character code`);
      return;
    }

    setLoading(true);
    try {
      const result = await verifyOtp({
        email,
        token: fullCode,
        type,
      });

      if (result.error) {
        toast("error", result.error);
        setCode(Array(CODE_LENGTH).fill(""));
        inputRefs.current[0]?.focus();
        return;
      }

      toast("success", "Email verified successfully!");
      if (type === "recovery") {
        router.push("/auth/reset-password");
      } else {
        router.push(result.redirectUrl || "/dashboard/tourist");
      }
    } catch {
      toast("error", "Verification failed");
      setCode(Array(CODE_LENGTH).fill(""));
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  }, [email, type, router, toast]);

  const handleVerify = useCallback(() => {
    handleVerifyWithCode(code.join(""));
  }, [code, handleVerifyWithCode]);

  const handleResend = async () => {
    if (!canResend) return;

    const result = await resendOtp(email, type);
    if (result.error) {
      toast("error", result.error);
    } else {
      toast("success", "New code sent to your email");
      setResendCooldown(60);
      setCanResend(false);
    }
  };

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
          <h1 className="mt-6 text-2xl font-bold text-heading">Verify Your Email</h1>
          <p className="mt-2 text-sm text-muted">
            Enter the 8-character code sent to{" "}
            <span className="font-medium text-heading">{email || "your email"}</span>
          </p>
        </div>

        <div className="bg-card rounded-[16px] border border-gray-100 shadow-sm p-6">
          {/* OTP Input — 8 chars */}
          <div className="flex justify-center gap-1.5">
            {code.map((char, i) => (
              <input
                key={i}
                ref={(el) => { inputRefs.current[i] = el; }}
                type="text"
                inputMode="text"
                maxLength={1}
                value={char}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className={cn(
                  "w-10 h-13 text-center text-lg font-mono font-bold border-2 rounded-[10px] transition-colors",
                  "focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20",
                  char ? "border-primary bg-primary/5" : "border-gray-200"
                )}
              />
            ))}
          </div>

          <div className="mt-6 space-y-3">
            <Button
              onClick={handleVerify}
              fullWidth
              loading={loading}
              size="lg"
              disabled={code.some((d) => d === "")}
            >
              Verify Code
            </Button>

            <div className="text-center">
              {canResend ? (
                <button
                  onClick={handleResend}
                  className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary-dark transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Resend Code
                </button>
              ) : (
                <p className="text-sm text-muted">
                  Resend code in {resendCooldown}s
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/auth/login"
              className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-heading transition-colors"
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
