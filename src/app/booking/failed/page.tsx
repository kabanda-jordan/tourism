"use client";

import Link from "next/link";
import { XCircle, RefreshCw, Home, HelpCircle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BookingFailedPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="flex items-center justify-center w-20 h-20 mx-auto rounded-full bg-error/10">
          <XCircle className="w-10 h-10 text-error" />
        </div>

        <h1 className="mt-6 text-2xl font-bold text-heading">Payment Failed</h1>
        <p className="mt-2 text-body">
          Your payment could not be processed. Don&apos;t worry — you haven&apos;t been charged.
        </p>

        {/* Possible Reasons */}
        <div className="mt-8 bg-card rounded-[16px] border border-gray-100 shadow-sm p-6 text-left">
          <h3 className="text-sm font-semibold text-heading">Possible reasons:</h3>
          <ul className="mt-2 text-sm text-body space-y-2">
            <li>• Insufficient funds</li>
            <li>• Card expired or blocked</li>
            <li>• Incorrect card details</li>
            <li>• Network timeout</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3">
          <Link href="/vehicles">
            <Button fullWidth size="lg">
              <RefreshCw className="w-4 h-4" />
              Try Again
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" fullWidth size="lg">
              <MessageCircle className="w-4 h-4" />
              Contact Support
            </Button>
          </Link>
          <Link href="/">
            <Button variant="ghost" fullWidth>
              <Home className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
