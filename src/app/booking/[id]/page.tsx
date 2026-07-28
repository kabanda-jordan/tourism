"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Calendar, Users, Shield, User, CheckCircle, ArrowLeft, ArrowRight, Loader2, Car, Clock, MapPin, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { cn, formatPrice, generateBookingCode } from "@/lib/utils";
import { useToast } from "@/components/ui/toast";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

const steps = [
  { id: 1, label: "Dates & Extras", icon: Calendar },
  { id: 2, label: "Driver Info", icon: User },
  { id: 3, label: "Review", icon: CheckCircle },
];

const extras = [
  { id: "insurance", label: "Comprehensive Insurance", description: "Full coverage for damage, theft, and liability", price: 25 },
  { id: "driver", label: "Professional Driver", description: "Experienced local driver/guide", price: 50 },
  { id: "gps", label: "GPS Navigation", description: "In-vehicle GPS device", price: 5 },
  { id: "child-seat", label: "Child Safety Seat", description: "Certified child car seat", price: 10 },
];

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const vehicleId = params.id as string;
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    pickupDate: "",
    dropoffDate: "",
    pickupLocation: "kigali",
    dropoffLocation: "kigali",
    pickupTime: "10:00",
    dropoffTime: "10:00",
    selectedExtras: [] as string[],
    driverName: "",
    driverPhone: "",
    driverEmail: "",
    driverLicense: "",
    specialRequests: "",
  });

  const totalDays = formData.pickupDate && formData.dropoffDate
    ? Math.max(1, Math.ceil((new Date(formData.dropoffDate).getTime() - new Date(formData.pickupDate).getTime()) / (1000 * 60 * 60 * 24)))
    : 1;

  const vehicleRate = 65000;
  const extrasTotal = formData.selectedExtras.reduce((sum, id) => sum + (extras.find((e) => e.id === id)?.price || 0) * totalDays, 0);
  const subtotal = vehicleRate * totalDays + extrasTotal;
  const serviceFee = Math.round(subtotal * 0.05);
  const total = subtotal + serviceFee;

  const handleExtraToggle = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedExtras: prev.selectedExtras.includes(id)
        ? prev.selectedExtras.filter((e) => e !== id)
        : [...prev.selectedExtras, id],
    }));
  };

  const canProceed = () => {
    if (currentStep === 1) return formData.pickupDate && formData.dropoffDate;
    if (currentStep === 2) return formData.driverName && formData.driverPhone && formData.driverEmail;
    return true;
  };

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep((s) => s + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((s) => s - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    const bookingCode = generateBookingCode();
    router.push(`/booking/payment?code=${bookingCode}&total=${total}`);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Vehicles", href: "/vehicles" },
            { label: "Book" },
          ]}
        />

        <h1 className="mt-4 text-2xl font-bold text-heading">Book Your Vehicle</h1>
        <p className="mt-1 text-sm text-muted">Vehicle ID: {vehicleId}</p>

        {/* Step Indicator */}
        <div className="mt-6 flex items-center justify-between max-w-lg">
          {steps.map((step, i) => (
            <div key={step.id} className="flex items-center">
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors",
                    currentStep >= step.id ? "bg-primary text-white" : "bg-gray-100 text-gray-400"
                  )}
                >
                  {currentStep > step.id ? <CheckCircle className="w-4 h-4" /> : step.id}
                </div>
                <span className={cn("text-sm font-medium hidden sm:block", currentStep >= step.id ? "text-heading" : "text-muted")}>
                  {step.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={cn("w-12 sm:w-20 h-0.5 mx-2", currentStep > step.id ? "bg-primary" : "bg-gray-100")} />
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Dates & Extras */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="bg-card rounded-[16px] border border-gray-100 shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-heading flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Pickup & Dropoff
                  </h2>
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Pickup Date"
                      type="date"
                      value={formData.pickupDate}
                      onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                      min={new Date().toISOString().split("T")[0]}
                    />
                    <Input
                      label="Dropoff Date"
                      type="date"
                      value={formData.dropoffDate}
                      onChange={(e) => setFormData({ ...formData, dropoffDate: e.target.value })}
                      min={formData.pickupDate || new Date().toISOString().split("T")[0]}
                    />
                    <Select
                      label="Pickup Location"
                      value={formData.pickupLocation}
                      onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                      options={[
                        { value: "kigali", label: "Kigali City Center" },
                        { value: "airport", label: "Kigali International Airport" },
                        { value: "hotel", label: "Hotel Delivery" },
                      ]}
                    />
                    <Select
                      label="Dropoff Location"
                      value={formData.dropoffLocation}
                      onChange={(e) => setFormData({ ...formData, dropoffLocation: e.target.value })}
                      options={[
                        { value: "kigali", label: "Kigali City Center" },
                        { value: "airport", label: "Kigali International Airport" },
                        { value: "hotel", label: "Hotel Pickup" },
                      ]}
                    />
                    <Input
                      label="Pickup Time"
                      type="time"
                      value={formData.pickupTime}
                      onChange={(e) => setFormData({ ...formData, pickupTime: e.target.value })}
                    />
                    <Input
                      label="Dropoff Time"
                      type="time"
                      value={formData.dropoffTime}
                      onChange={(e) => setFormData({ ...formData, dropoffTime: e.target.value })}
                    />
                  </div>
                </div>

                <div className="bg-card rounded-[16px] border border-gray-100 shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-heading flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    Add Extras
                  </h2>
                  <p className="text-sm text-muted mt-1">Enhance your rental experience</p>
                  <div className="mt-4 space-y-3">
                    {extras.map((extra) => (
                      <label
                        key={extra.id}
                        className={cn(
                          "flex items-center gap-3 p-3 rounded-[12px] border cursor-pointer transition-colors",
                          formData.selectedExtras.includes(extra.id)
                            ? "border-primary bg-primary/5"
                            : "border-gray-100 hover:border-gray-200"
                        )}
                      >
                        <Checkbox
                          checked={formData.selectedExtras.includes(extra.id)}
                          onChange={() => handleExtraToggle(extra.id)}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-heading">{extra.label}</p>
                          <p className="text-xs text-muted">{extra.description}</p>
                        </div>
                        <span className="text-sm font-medium text-primary">+{formatPrice(extra.price)}/day</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Driver Info */}
            {currentStep === 2 && (
              <div className="bg-card rounded-[16px] border border-gray-100 shadow-sm p-6">
                <h2 className="text-lg font-semibold text-heading flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Driver Information
                </h2>
                <p className="text-sm text-muted mt-1">Primary driver details</p>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    placeholder="John Doe"
                    value={formData.driverName}
                    onChange={(e) => setFormData({ ...formData, driverName: e.target.value })}
                  />
                  <Input
                    label="Phone Number"
                    placeholder="+250 7XX XXX XXX"
                    value={formData.driverPhone}
                    onChange={(e) => setFormData({ ...formData, driverPhone: e.target.value })}
                  />
                  <Input
                    label="Email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.driverEmail}
                    onChange={(e) => setFormData({ ...formData, driverEmail: e.target.value })}
                  />
                  <Input
                    label="Driver License Number"
                    placeholder="License number"
                    value={formData.driverLicense}
                    onChange={(e) => setFormData({ ...formData, driverLicense: e.target.value })}
                  />
                </div>
                <div className="mt-4">
                  <label className="text-sm font-medium text-heading">Special Requests</label>
                  <textarea
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    placeholder="Any special requirements or requests..."
                    className="mt-1 w-full rounded-[12px] border border-gray-200 px-3 py-2 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary min-h-[80px]"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {currentStep === 3 && (
              <div className="bg-card rounded-[16px] border border-gray-100 shadow-sm p-6">
                <h2 className="text-lg font-semibold text-heading flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  Review Your Booking
                </h2>
                <div className="mt-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted">Pickup</p>
                      <p className="font-medium text-heading">{formData.pickupDate || "Not set"} at {formData.pickupTime}</p>
                      <p className="text-muted text-xs mt-0.5">{formData.pickupLocation === "kigali" ? "Kigali City Center" : formData.pickupLocation === "airport" ? "Kigali International Airport" : "Hotel Delivery"}</p>
                    </div>
                    <div>
                      <p className="text-muted">Dropoff</p>
                      <p className="font-medium text-heading">{formData.dropoffDate || "Not set"} at {formData.dropoffTime}</p>
                      <p className="text-muted text-xs mt-0.5">{formData.dropoffLocation === "kigali" ? "Kigali City Center" : formData.dropoffLocation === "airport" ? "Kigali International Airport" : "Hotel Pickup"}</p>
                    </div>
                  </div>
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-sm text-muted">Duration</p>
                    <p className="font-medium text-heading">{totalDays} day{totalDays > 1 ? "s" : ""}</p>
                  </div>
                  {formData.selectedExtras.length > 0 && (
                    <div className="border-t border-gray-100 pt-4">
                      <p className="text-sm text-muted mb-2">Extras</p>
                      {formData.selectedExtras.map((id) => {
                        const extra = extras.find((e) => e.id === id);
                        return extra ? (
                          <p key={id} className="text-sm text-body">{extra.label} — +{formatPrice(extra.price)}/day</p>
                        ) : null;
                      })}
                    </div>
                  )}
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-sm text-muted">Driver</p>
                    <p className="font-medium text-heading">{formData.driverName}</p>
                    <p className="text-xs text-muted">{formData.driverEmail} · {formData.driverPhone}</p>
                  </div>
                  {formData.specialRequests && (
                    <div className="border-t border-gray-100 pt-4">
                      <p className="text-sm text-muted">Special Requests</p>
                      <p className="text-sm text-body">{formData.specialRequests}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-card rounded-[16px] border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-heading mb-4">Price Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted">Vehicle ({totalDays} day{totalDays > 1 ? "s" : ""})</span>
                  <span className="text-heading">{formatPrice(vehicleRate * totalDays)}</span>
                </div>
                {formData.selectedExtras.map((id) => {
                  const extra = extras.find((e) => e.id === id);
                  return extra ? (
                    <div key={id} className="flex justify-between text-xs">
                      <span className="text-muted">{extra.label} × {totalDays}d</span>
                      <span className="text-heading">{formatPrice(extra.price * totalDays)}</span>
                    </div>
                  ) : null;
                })}
                {formData.selectedExtras.length > 0 && <div className="border-t border-gray-100 pt-2" />}
                <div className="flex justify-between">
                  <span className="text-muted">Subtotal</span>
                  <span className="text-heading">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Service fee (5%)</span>
                  <span className="text-heading">{formatPrice(serviceFee)}</span>
                </div>
                <div className="border-t border-gray-100 pt-2 flex justify-between font-semibold">
                  <span className="text-heading">Total</span>
                  <span className="text-primary text-lg">{formatPrice(total)}</span>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                {currentStep > 1 && (
                  <Button variant="outline" onClick={handleBack} className="flex-1">
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </Button>
                )}
                {currentStep < 3 ? (
                  <Button onClick={handleNext} disabled={!canProceed()} className="flex-1">
                    Next
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} loading={loading} className="flex-1">
                    <CreditCard className="w-4 h-4" />
                    Proceed to Pay
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
