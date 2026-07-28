"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Download, Mail, Phone, Home, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

function SuccessContent() {
  const searchParams = useSearchParams();
  const bookingCode = searchParams.get("code") || "RW-XXXXXX";
  const total = parseInt(searchParams.get("total") || "0");

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Success Animation */}
        <div className="relative">
          <div className="flex items-center justify-center w-20 h-20 mx-auto rounded-full bg-success/10">
            <CheckCircle className="w-10 h-10 text-success" />
          </div>
        </div>

        <h1 className="mt-6 text-2xl font-bold text-heading">Booking Confirmed!</h1>
        <p className="mt-2 text-body">
          Your vehicle has been reserved. A confirmation email has been sent to your inbox.
        </p>

        {/* Booking Details */}
        <div className="mt-8 bg-card rounded-[16px] border border-gray-100 shadow-sm p-6 text-left space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted">Booking Code</span>
            <span className="font-mono font-semibold text-primary">{bookingCode}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted">Total Paid</span>
            <span className="font-semibold text-heading">{formatPrice(total)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted">Status</span>
            <span className="text-success font-medium">Confirmed</span>
          </div>
        </div>

        {/* What Next */}
        <div className="mt-6 bg-primary/5 rounded-[16px] p-4">
          <h3 className="text-sm font-semibold text-heading">What&apos;s next?</h3>
          <ul className="mt-2 text-xs text-body space-y-1 text-left">
            <li>• Check your email for booking details</li>
            <li>• Our team will contact you to confirm pickup</li>
            <li>• Bring your driver&apos;s license on pickup day</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3">
          <Link href="/trips">
            <Button fullWidth size="lg">
              <Car className="w-4 h-4" />
              View My Trips
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" fullWidth size="lg">
              <Home className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>}>
      <SuccessContent />
    </Suspense>
  );
}
