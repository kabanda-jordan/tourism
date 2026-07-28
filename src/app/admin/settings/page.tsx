"use client";

import { useState } from "react";
import { Settings, Globe, Shield, Bell, Palette, Save } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "general", label: "General", icon: Settings },
  { id: "security", label: "Security", icon: Shield },
  { id: "notifications", label: "Notifications", icon: Bell },
];

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    platformName: "Trekly",
    supportEmail: "support@trekly.rw",
    platformFee: "5",
    minBookingDays: "1",
    maxBookingDays: "90",
    autoApproveVehicles: false,
    requireDriverLicense: true,
    enable2FA: true,
    enableEmailNotifications: true,
    enableSMSNotifications: false,
  });

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSaving(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Admin", href: "/admin" }, { label: "Settings" }]} />
        <h1 className="mt-4 text-2xl font-bold text-heading">Platform Settings</h1>

        <div className="mt-6 flex gap-2 border-b border-gray-100 pb-1">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={cn("flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-t-lg transition-colors", activeTab === tab.id ? "bg-primary/5 text-primary border-b-2 border-primary" : "text-muted hover:text-heading")}>
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "general" && (
          <div className="mt-6 space-y-6">
            <div className="bg-card rounded-[16px] border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-heading">Platform</h3>
              <Input label="Platform Name" value={settings.platformName} onChange={(e) => setSettings({ ...settings, platformName: e.target.value })} />
              <Input label="Support Email" type="email" value={settings.supportEmail} onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })} />
              <Input label="Platform Fee (%)" type="number" value={settings.platformFee} onChange={(e) => setSettings({ ...settings, platformFee: e.target.value })} />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Min Booking Days" type="number" value={settings.minBookingDays} onChange={(e) => setSettings({ ...settings, minBookingDays: e.target.value })} />
                <Input label="Max Booking Days" type="number" value={settings.maxBookingDays} onChange={(e) => setSettings({ ...settings, maxBookingDays: e.target.value })} />
              </div>
            </div>
            <Button onClick={handleSave} loading={saving}><Save className="w-4 h-4" /> Save Changes</Button>
          </div>
        )}

        {activeTab === "security" && (
          <div className="mt-6 space-y-6">
            <div className="bg-card rounded-[16px] border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-heading">Security Policies</h3>
              {[
                { key: "autoApproveVehicles", label: "Auto-approve vehicle listings", desc: "Skip manual review for new vehicles" },
                { key: "requireDriverLicense", label: "Require driver license verification", desc: "All drivers must upload a license" },
                { key: "enable2FA", label: "Require 2FA for admin accounts", desc: "Enforce two-factor authentication" },
              ].map((s) => (
                <label key={s.key} className="flex items-center justify-between p-3 rounded-[12px] hover:bg-gray-50">
                  <div>
                    <p className="text-sm font-medium text-heading">{s.label}</p>
                    <p className="text-xs text-muted">{s.desc}</p>
                  </div>
                  <Checkbox checked={settings[s.key as keyof typeof settings] as boolean} onChange={() => setSettings({ ...settings, [s.key]: !settings[s.key as keyof typeof settings] })} />
                </label>
              ))}
            </div>
            <Button onClick={handleSave} loading={saving}><Save className="w-4 h-4" /> Save Changes</Button>
          </div>
        )}

        {activeTab === "notifications" && (
          <div className="mt-6 space-y-6">
            <div className="bg-card rounded-[16px] border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-heading">Notification Settings</h3>
              {[
                { key: "enableEmailNotifications", label: "Email notifications", desc: "Send email alerts for bookings, payments, etc." },
                { key: "enableSMSNotifications", label: "SMS notifications", desc: "Send SMS alerts for critical events" },
              ].map((s) => (
                <label key={s.key} className="flex items-center justify-between p-3 rounded-[12px] hover:bg-gray-50">
                  <div>
                    <p className="text-sm font-medium text-heading">{s.label}</p>
                    <p className="text-xs text-muted">{s.desc}</p>
                  </div>
                  <Checkbox checked={settings[s.key as keyof typeof settings] as boolean} onChange={() => setSettings({ ...settings, [s.key]: !settings[s.key as keyof typeof settings] })} />
                </label>
              ))}
            </div>
            <Button onClick={handleSave} loading={saving}><Save className="w-4 h-4" /> Save Changes</Button>
          </div>
        )}
      </div>
    </div>
  );
}
