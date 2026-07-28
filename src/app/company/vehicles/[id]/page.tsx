"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Upload, X, Plus, Trash2 } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

const features = [
  "Air Conditioning", "Bluetooth", "USB Charging", "GPS Navigation", "Backup Camera",
  "4WD/AWD", "Leather Seats", "Sunroof", "Roof Rack", "Bluetooth Audio",
  "Cruise Control", "Heated Seats", "Keyless Entry", "Automatic Transmission",
];

const categories = ["SUV", "Sedan", "Truck", "Van", "Hatchback", "Luxury"];
const transmissions = ["Automatic", "Manual"];
const fuelTypes = ["Petrol", "Diesel", "Hybrid", "Electric"];

export default function VehicleFormPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const isNew = !params.id || params.id === "new";
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    category: "SUV",
    transmission: "Automatic",
    fuelType: "Petrol",
    seats: 5,
    year: 2024,
    pricePerDay: "",
    description: "",
    features: [] as string[],
  });

  const toggleFeature = (f: string) => {
    setForm((prev) => ({
      ...prev,
      features: prev.features.includes(f) ? prev.features.filter((x) => x !== f) : [...prev.features, f],
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1500));
    toast("success", isNew ? "Vehicle added successfully!" : "Vehicle updated successfully!");
    router.push("/company/vehicles");
    setSaving(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Company", href: "/company" },
            { label: "Vehicles", href: "/company/vehicles" },
            { label: isNew ? "Add Vehicle" : "Edit Vehicle" },
          ]}
        />

        <div className="mt-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-heading">{isNew ? "Add New Vehicle" : "Edit Vehicle"}</h1>
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </div>

        <div className="mt-6 space-y-6">
          {/* Images */}
          <div className="bg-card rounded-[16px] border border-gray-100 shadow-sm p-6">
            <h3 className="font-semibold text-heading mb-4">Vehicle Images</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <label className="flex flex-col items-center justify-center h-32 rounded-[12px] border-2 border-dashed border-gray-200 hover:border-primary cursor-pointer transition-colors">
                <Upload className="w-6 h-6 text-muted" />
                <span className="text-xs text-muted mt-1">Add Image</span>
                <input type="file" accept="image/*" className="hidden" />
              </label>
            </div>
          </div>

          {/* Basic Info */}
          <div className="bg-card rounded-[16px] border border-gray-100 shadow-sm p-6 space-y-4">
            <h3 className="font-semibold text-heading">Basic Information</h3>
            <Input
              label="Vehicle Name"
              placeholder="e.g. Toyota RAV4 2024"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-4">
              <Select label="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} options={categories.map((c) => ({ value: c, label: c }))} />
              <Select label="Transmission" value={form.transmission} onChange={(e) => setForm({ ...form, transmission: e.target.value })} options={transmissions.map((t) => ({ value: t, label: t }))} />
              <Select label="Fuel Type" value={form.fuelType} onChange={(e) => setForm({ ...form, fuelType: e.target.value })} options={fuelTypes.map((f) => ({ value: f, label: f }))} />
              <Input label="Seats" type="number" value={form.seats} onChange={(e) => setForm({ ...form, seats: parseInt(e.target.value) || 5 })} />
              <Input label="Year" type="number" value={form.year} onChange={(e) => setForm({ ...form, year: parseInt(e.target.value) || 2024 })} />
              <Input label="Price per Day (RWF)" type="number" placeholder="65000" value={form.pricePerDay} onChange={(e) => setForm({ ...form, pricePerDay: e.target.value })} />
            </div>
            <Textarea label="Description" placeholder="Describe your vehicle..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>

          {/* Features */}
          <div className="bg-card rounded-[16px] border border-gray-100 shadow-sm p-6">
            <h3 className="font-semibold text-heading mb-4">Features & Amenities</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {features.map((f) => (
                <label
                  key={f}
                  className={cn(
                    "flex items-center gap-2 p-2 rounded-[8px] text-sm cursor-pointer transition-colors",
                    form.features.includes(f) ? "bg-primary/5 text-primary" : "hover:bg-gray-50 text-body"
                  )}
                >
                  <Checkbox checked={form.features.includes(f)} onChange={() => toggleFeature(f)} />
                  {f}
                </label>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button onClick={handleSave} loading={saving} className="flex-1">
              <Save className="w-4 h-4" />
              {isNew ? "Add Vehicle" : "Save Changes"}
            </Button>
            <Button variant="outline" onClick={() => router.back()}>Cancel</Button>
          </div>
        </div>
      </div>
    </div>
  );
}


