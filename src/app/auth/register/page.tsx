"use client";

import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import RegisterClient from "./register-client";

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <RegisterClient />
    </Suspense>
  );
}
