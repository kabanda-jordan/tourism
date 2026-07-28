"use client";

import { useState } from "react";
import { Bell, Check, CheckCheck, Trash2, Filter } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const notifications = [
  { id: "1", type: "booking", title: "Booking Confirmed", message: "Your booking RW-A1B2C3 for Toyota RAV4 has been confirmed.", time: "2 hours ago", read: false },
  { id: "2", type: "payment", title: "Payment Received", message: "Payment of 325,000 RWF has been processed successfully.", time: "2 hours ago", read: false },
  { id: "3", type: "reminder", title: "Pickup Reminder", message: "Your vehicle pickup is in 3 days. Don't forget your documents!", time: "1 day ago", read: true },
  { id: "4", type: "promo", title: "Special Offer", message: "Get 15% off your next booking. Use code RWANDA15.", time: "3 days ago", read: true },
  { id: "5", type: "system", title: "System Update", message: "We've improved our booking system. Check out the new features!", time: "1 week ago", read: true },
];

const typeColors: Record<string, string> = {
  booking: "bg-success/10 text-success",
  payment: "bg-primary/10 text-primary",
  reminder: "bg-warning/10 text-warning",
  promo: "bg-secondary/10 text-secondary",
  system: "bg-gray-100 text-gray-500",
};

export default function NotificationsPage() {
  const [items, setItems] = useState(notifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const filtered = filter === "unread" ? items.filter((n) => !n.read) : items;

  const markAllRead = () => setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  const markRead = (id: string) => setItems((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  const deleteNotification = (id: string) => setItems((prev) => prev.filter((n) => n.id !== id));

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Notifications" }]} />

        <div className="mt-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-heading">Notifications</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilter(filter === "all" ? "unread" : "all")}
              className="text-sm text-primary hover:underline"
            >
              {filter === "all" ? "Show unread" : "Show all"}
            </button>
            <Button variant="ghost" size="sm" onClick={markAllRead}>
              <CheckCheck className="w-4 h-4" />
              Mark all read
            </Button>
          </div>
        </div>

        <div className="mt-6 space-y-2">
          {filtered.map((n) => (
            <div
              key={n.id}
              className={cn(
                "bg-card rounded-[16px] border p-4 flex items-start gap-3 transition-colors",
                n.read ? "border-gray-100" : "border-primary/20 bg-primary/5"
              )}
            >
              <div className={cn("w-8 h-8 rounded-full flex items-center justify-center shrink-0", typeColors[n.type])}>
                <Bell className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-heading">{n.title}</p>
                  {!n.read && <div className="w-2 h-2 rounded-full bg-primary shrink-0" />}
                </div>
                <p className="text-sm text-body mt-0.5">{n.message}</p>
                <p className="text-xs text-muted mt-1">{n.time}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                {!n.read && (
                  <button onClick={() => markRead(n.id)} className="p-1 rounded-lg hover:bg-gray-100">
                    <Check className="w-3.5 h-3.5 text-muted" />
                  </button>
                )}
                <button onClick={() => deleteNotification(n.id)} className="p-1 rounded-lg hover:bg-error/10">
                  <Trash2 className="w-3.5 h-3.5 text-muted hover:text-error" />
                </button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <Bell className="w-10 h-10 text-gray-300 mx-auto" />
              <p className="mt-2 text-sm text-muted">No notifications</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
