"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import { CreditCard, Smartphone, Building, CheckCircle, Loader2, ArrowLeft, Shield, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn, formatPrice } from "@/lib/utils";
import { useToast } from "@/components/ui/toast";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

const paymentMethods = [
  { id: "card", label: "Credit/Debit Card", description: "Visa, Mastercard", icon: CreditCard },
  { id: "mobile", label: "Mobile Money", description: "MTN MoMo, Airtel Money", icon: Smartphone },
  { id: "bank", label: "Bank Transfer", description: "Direct bank transfer", icon: Building },
];

function PaymentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const bookingCode = searchParams.get("code") || "N/A";
  const total = parseInt(searchParams.get("total") || "0");

  const [selectedMethod, setSelectedMethod] = useState("card");
  const [loading, setLoading] = useState(false);
  const [cardData, setCardData] = useState({ number: "", expiry: "", cvv: "", name: "" });

  const handlePayment = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2500));

    // Simulate payment success (Flutterwave would redirect here)
    const success = Math.random() > 0.2; // 80% success for demo
    if (success) {
      toast("success", "Payment successful!");
      router.push(`/booking/success?code=${bookingCode}&total=${total}`);
    } else {
      toast("error", "Payment failed. Please try again.");
      router.push("/booking/failed");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-lg px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Booking", href: "/vehicles" },
            { label: "Payment" },
          ]}
        />

        <div className="mt-6 text-center">
          <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-full bg-primary/10">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-heading">Secure Payment</h1>
          <p className="mt-1 text-sm text-muted">Booking: {bookingCode}</p>
        </div>

        {/* Payment Methods */}
        <div className="mt-6 space-y-3">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className={cn(
                "flex items-center gap-3 w-full p-4 rounded-[12px] border transition-colors text-left",
                selectedMethod === method.id
                  ? "border-primary bg-primary/5 ring-1 ring-primary"
                  : "border-gray-100 hover:border-gray-200"
              )}
            >
              <method.icon className={cn("w-5 h-5", selectedMethod === method.id ? "text-primary" : "text-muted")} />
              <div>
                <p className="text-sm font-medium text-heading">{method.label}</p>
                <p className="text-xs text-muted">{method.description}</p>
              </div>
              <div className="ml-auto">
                <div className={cn("w-4 h-4 rounded-full border-2", selectedMethod === method.id ? "border-primary" : "border-gray-300")}>
                  {selectedMethod === method.id && <div className="w-2 h-2 bg-primary rounded-full mx-auto mt-0.5" />}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Card Form */}
        {selectedMethod === "card" && (
          <div className="mt-6 bg-card rounded-[16px] border border-gray-100 shadow-sm p-6 space-y-4">
            <Input
              label="Card Number"
              placeholder="1234 5678 9012 3456"
              value={cardData.number}
              onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Expiry"
                placeholder="MM/YY"
                value={cardData.expiry}
                onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
              />
              <Input
                label="CVV"
                placeholder="123"
                value={cardData.cvv}
                onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
              />
            </div>
            <Input
              label="Cardholder Name"
              placeholder="John Doe"
              value={cardData.name}
              onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
            />
          </div>
        )}

        {selectedMethod === "mobile" && (
          <div className="mt-6 bg-card rounded-[16px] border border-gray-100 shadow-sm p-6">
            <Input label="Mobile Number" placeholder="+250 7XX XXX XXX" />
            <p className="text-xs text-muted mt-3">You will receive an STK push to confirm payment.</p>
          </div>
        )}

        {selectedMethod === "bank" && (
          <div className="mt-6 bg-card rounded-[16px] border border-gray-100 shadow-sm p-6">
            <p className="text-sm text-heading font-medium">Bank Details</p>
            <div className="mt-3 text-sm text-body space-y-1">
              <p>Bank: Bank of Kigali</p>
              <p>Account: 1234567890</p>
              <p>Name: Trekly Ltd</p>
              <p className="text-muted text-xs mt-2">Transfer the exact amount and upload your receipt.</p>
            </div>
          </div>
        )}

        {/* Total */}
        <div className="mt-6 bg-card rounded-[16px] border border-gray-100 shadow-sm p-4 flex items-center justify-between">
          <span className="text-sm text-muted">Total Amount</span>
          <span className="text-xl font-bold text-primary">{formatPrice(total)}</span>
        </div>

        <Button
          onClick={handlePayment}
          loading={loading}
          fullWidth
          size="lg"
          className="mt-6"
        >
          <Shield className="w-4 h-4" />
          {loading ? "Processing..." : `Pay ${formatPrice(total)}`}
        </Button>

        <p className="mt-4 text-center text-xs text-muted flex items-center justify-center gap-1">
          <Lock className="w-3 h-3" />
          Payments are secure and encrypted by Flutterwave
        </p>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>}>
      <PaymentContent />
    </Suspense>
  );
}
