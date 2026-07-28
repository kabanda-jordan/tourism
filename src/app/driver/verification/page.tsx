"use client";

import Link from "next/link";
import { Car, Star, ArrowLeft, CheckCircle, Clock, Shield } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";

export default function DriverVerificationPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Driver Verification" }]} />

        <div className="mt-4 text-center">
          <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-primary/10">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-heading">Driver Verification</h1>
          <p className="mt-2 text-sm text-muted">Complete these steps to start accepting rides</p>
        </div>

        <div className="mt-8 space-y-4">
          {[
            { title: "Upload Driver's License", desc: "Clear photo of your valid driver's license", status: "completed", icon: CheckCircle },
            { title: "Upload National ID", desc: "Front and back of your national ID card", status: "completed", icon: CheckCircle },
            { title: "Criminal Record Check", desc: "Police clearance certificate", status: "pending", icon: Clock },
            { title: "Vehicle Inspection", desc: "If bringing your own vehicle", status: "not_started", icon: Car },
          ].map((step, i) => (
            <div key={i} className="bg-card rounded-[16px] border border-gray-100 shadow-sm p-4 flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                step.status === "completed" ? "bg-success/10" : step.status === "pending" ? "bg-warning/10" : "bg-gray-100"
              }`}>
                <step.icon className={`w-5 h-5 ${
                  step.status === "completed" ? "text-success" : step.status === "pending" ? "text-warning" : "text-muted"
                }`} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-heading">{step.title}</p>
                <p className="text-xs text-muted">{step.desc}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                step.status === "completed" ? "bg-success/10 text-success" : step.status === "pending" ? "bg-warning/10 text-warning" : "bg-gray-100 text-muted"
              }`}>
                {step.status === "completed" ? "Verified" : step.status === "pending" ? "Under Review" : "Not Started"}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted mb-4">Verification usually takes 1-3 business days</p>
          <Link href="/driver">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
