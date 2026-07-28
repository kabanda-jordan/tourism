"use client";

import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import ForgotPasswordClient from "./forgot-password-client";

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
  );
}

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ForgotPasswordClient />
    </Suspense>
  );
}
