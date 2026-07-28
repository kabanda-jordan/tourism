import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import VerifyOTPClient from "./verify-otp-client";

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
  );
}

export default function VerifyOTPPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <VerifyOTPClient />
    </Suspense>
  );
}
