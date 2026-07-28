"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Camera, Save, User, Mail, Phone, Lock, Shield, Bell, Trash2, Smartphone, Mail as MailIcon, Loader2 } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import { getUser, getProfile, toggle2FA } from "@/lib/actions/auth";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "security", label: "Security", icon: Lock },
  { id: "notifications", label: "Notifications", icon: Bell },
];

export default function ProfilePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [notifications, setNotifications] = useState({ email: true, push: true, sms: false, marketing: false });
  const [toggling2FA, setToggling2FA] = useState(false);

  useEffect(() => {
    (async () => {
      const u = await getUser();
      if (!u) { router.push("/auth/login"); return; }
      setUser(u);
      const p = await getProfile();
      setProfile(p);
      setLoading(false);
    })();
  }, [router]);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSaving(false);
    toast("success", "Profile updated");
  };

  const handleToggle2FA = async () => {
    setToggling2FA(true);
    const enabled = !profile?.two_factor_enabled;
    const result = await toggle2FA(enabled, "email");
    if (result.error) {
      toast("error", result.error);
    } else {
      setProfile({ ...profile, two_factor_enabled: enabled, two_factor_method: enabled ? "email" : null });
      toast("success", enabled ? "2FA enabled" : "2FA disabled");
    }
    setToggling2FA(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Profile" }]} />
        <h1 className="mt-4 text-2xl font-bold text-heading">Profile Settings</h1>

        {/* Tabs */}
        <div className="mt-6 flex gap-2 border-b border-gray-100 pb-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-t-lg transition-colors",
                activeTab === tab.id ? "bg-primary/5 text-primary border-b-2 border-primary" : "text-muted hover:text-heading"
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="mt-6 space-y-6">
            {/* Avatar */}
            <div className="bg-card rounded-[16px] border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                    {(profile?.full_name || user?.email || "U").charAt(0).toUpperCase()}
                  </div>
                  <button className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center">
                    <Camera className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div>
                  <p className="font-medium text-heading">Profile Photo</p>
                  <p className="text-xs text-muted">JPG, PNG or GIF. Max 2MB.</p>
                </div>
              </div>
            </div>

            {/* Personal Info */}
            <div className="bg-card rounded-[16px] border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-heading">Personal Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  value={profile?.full_name || ""}
                  onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                />
                <Input
                  label="Email"
                  type="email"
                  value={user?.email || ""}
                  disabled
                />
                <Input
                  label="Phone"
                  value={profile?.phone || ""}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                />
              </div>
              <Button onClick={handleSave} loading={saving} size="sm">
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === "security" && (
          <div className="mt-6 space-y-6">
            <div className="bg-card rounded-[16px] border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-heading">Change Password</h3>
              <Input label="Current Password" type="password" placeholder="••••••••" />
              <Input label="New Password" type="password" placeholder="••••••••" />
              <Input label="Confirm New Password" type="password" placeholder="••••••••" />
              <Button size="sm">
                <Lock className="w-4 h-4" />
                Update Password
              </Button>
            </div>

            <div className="bg-card rounded-[16px] border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-heading flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    Two-Factor Authentication
                  </h3>
                  <p className="text-sm text-muted mt-1">
                    {profile?.two_factor_enabled
                      ? "2FA is enabled. You'll need a verification code to log in."
                      : "Add an extra layer of security to your account."}
                  </p>
                  {profile?.two_factor_enabled && (
                    <p className="text-xs text-muted mt-1 flex items-center gap-1">
                      <MailIcon className="w-3 h-3" />
                      Method: Email code
                    </p>
                  )}
                </div>
                <button
                  onClick={handleToggle2FA}
                  disabled={toggling2FA}
                  className={cn(
                    "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                    profile?.two_factor_enabled ? "bg-primary" : "bg-gray-300"
                  )}
                >
                  {toggling2FA ? (
                    <Loader2 className="w-4 h-4 animate-spin text-white mx-auto" />
                  ) : (
                    <span
                      className={cn(
                        "inline-block h-5 w-5 rounded-full bg-white transition-transform",
                        profile?.two_factor_enabled ? "translate-x-5" : "translate-x-0.5"
                      )}
                    />
                  )}
                </button>
              </div>
            </div>

            <div className="bg-error/5 rounded-[16px] border border-error/20 p-6">
              <h3 className="font-semibold text-error flex items-center gap-2">
                <Trash2 className="w-4 h-4" />
                Delete Account
              </h3>
              <p className="text-sm text-body mt-1">Permanently delete your account and all data.</p>
              <Button variant="danger" size="sm" className="mt-3">
                Delete Account
              </Button>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === "notifications" && (
          <div className="mt-6">
            <div className="bg-card rounded-[16px] border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-heading">Notification Preferences</h3>
              {[
                { key: "email", label: "Email Notifications", desc: "Receive booking updates via email" },
                { key: "push", label: "Push Notifications", desc: "Browser push notifications" },
                { key: "sms", label: "SMS Notifications", desc: "Text message alerts for bookings" },
                { key: "marketing", label: "Marketing", desc: "Deals, offers, and travel tips" },
              ].map((n) => (
                <label key={n.key} className="flex items-center justify-between p-3 rounded-[12px] hover:bg-gray-50">
                  <div>
                    <p className="text-sm font-medium text-heading">{n.label}</p>
                    <p className="text-xs text-muted">{n.desc}</p>
                  </div>
                  <Checkbox
                    checked={notifications[n.key as keyof typeof notifications]}
                    onChange={() => setNotifications({ ...notifications, [n.key as keyof typeof notifications]: !notifications[n.key as keyof typeof notifications] })}
                  />
                </label>
              ))}
              <Button size="sm">
                <Save className="w-4 h-4" />
                Save Preferences
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
