"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Car, Loader2, ArrowLeft, Smartphone, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

export default function Verify2FAPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [method, setMethod] = useState<"totp" | "email">("totp");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = useCallback(async () => {
    const fullCode = code.join("");
    if (fullCode.length !== 6) {
      toast("error", "Please enter the complete 6-digit code");
      return;
    }

    setLoading(true);
    try {
      // TODO: Verify TOTP code with Supabase MFA
      toast("success", "2FA verified successfully!");
      router.push("/dashboard/tourist");
    } catch {
      toast("error", "Invalid code. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [code, router, toast]);

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
          <h1 className="mt-6 text-2xl font-bold text-heading">
            Two-Factor Authentication
          </h1>
          <p className="mt-2 text-sm text-muted">
            Enter the verification code to continue
          </p>
        </div>

        <div className="bg-card rounded-[16px] border border-gray-100 shadow-sm p-6">
          {/* Method Toggle */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setMethod("totp")}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-2.5 px-3 text-sm font-medium rounded-[10px] transition-colors",
                method === "totp"
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-body hover:bg-gray-200"
              )}
            >
              <Smartphone className="w-4 h-4" />
              Authenticator App
            </button>
            <button
              onClick={() => setMethod("email")}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-2.5 px-3 text-sm font-medium rounded-[10px] transition-colors",
                method === "email"
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-body hover:bg-gray-200"
              )}
            >
              <Mail className="w-4 h-4" />
              Email Code
            </button>
          </div>

          {method === "totp" ? (
            <p className="text-sm text-body text-center mb-6">
              Open your authenticator app and enter the 6-digit code
            </p>
          ) : (
            <p className="text-sm text-body text-center mb-6">
              Check your email for the 6-digit verification code
            </p>
          )}

          {/* Code Input */}
          <div className="flex justify-center gap-2">
            {code.map((digit, i) => (
              <input
                key={i}
                ref={(el) => { inputRefs.current[i] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className={cn(
                  "w-11 h-13 text-center text-xl font-mono font-bold border-2 rounded-[10px] transition-colors",
                  "focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20",
                  digit ? "border-primary bg-primary/5" : "border-gray-200"
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
            >
              Verify
            </Button>

            {method === "email" && (
              <Button variant="ghost" fullWidth>
                Resend Code
              </Button>
            )}
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
