"use client";

import Link from "next/link";
import { Calendar, Car, MapPin, Star, Clock, CreditCard, TrendingUp, Heart, Bell, ChevronRight } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const upcomingBookings = [
  { id: "RW-A1B2C3", vehicle: "Toyota RAV4 2024", dates: "Mar 15 - Mar 20", status: "confirmed", total: 325000, image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=200&q=80" },
  { id: "RW-D4E5F6", vehicle: "Land Rover Defender", dates: "Apr 2 - Apr 5", status: "pending", total: 420000, image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=200&q=80" },
];

const pastBookings = [
  { id: "RW-G7H8I9", vehicle: "Toyota Hilux 2023", dates: "Jan 10 - Jan 15", status: "completed", total: 275000, rating: 5 },
];

const stats = [
  { label: "Total Bookings", value: "4", icon: Calendar, change: "+1 this month" },
  { label: "Total Spent", value: "1.3M RWF", icon: CreditCard, change: "On vehicle rentals" },
  { label: "Countries Visited", value: "3", icon: MapPin, change: "Rwanda, Uganda, Tanzania" },
  { label: "Wishlist Items", value: "5", icon: Heart, change: "Vehicles saved" },
];

export default function TouristDashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-heading">Welcome back, John!</h1>
            <p className="text-sm text-muted mt-1">Here&apos;s what&apos;s happening with your bookings</p>
          </div>
          <Link href="/vehicles">
            <Button>
              <Car className="w-4 h-4" />
              Book a Vehicle
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-card rounded-[16px] border border-gray-100 shadow-sm p-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 shrink-0">
                  <s.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xl font-bold text-heading">{s.value}</p>
                  <p className="text-xs text-muted">{s.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Upcoming Bookings */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-heading">Upcoming Bookings</h2>
            <Link href="/trips" className="text-sm text-primary hover:underline flex items-center gap-1">
              View all <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {upcomingBookings.map((b) => (
              <Link key={b.id} href={`/trips/${b.id}`}>
                <div className="bg-card rounded-[16px] border border-gray-100 shadow-sm p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
                  <img src={b.image} alt={b.vehicle} className="w-20 h-16 rounded-[12px] object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-heading truncate">{b.vehicle}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${b.status === "confirmed" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>
                        {b.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3 h-3" /> {b.dates}
                    </p>
                    <p className="text-sm font-medium text-primary mt-0.5">{b.total.toLocaleString()} RWF</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted shrink-0" />
                </div>
              </Link>
            ))}
            {upcomingBookings.length === 0 && (
              <div className="bg-card rounded-[16px] border border-dashed border-gray-200 p-8 text-center">
                <Car className="w-10 h-10 text-gray-300 mx-auto" />
                <p className="mt-2 text-sm text-muted">No upcoming bookings</p>
                <Link href="/vehicles">
                  <Button size="sm" className="mt-3">Browse Vehicles</Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Past Bookings */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-heading mb-4">Past Bookings</h2>
          <div className="space-y-3">
            {pastBookings.map((b) => (
              <div key={b.id} className="bg-card rounded-[16px] border border-gray-100 shadow-sm p-4 flex items-center gap-4 opacity-80">
                <div className="flex-1">
                  <p className="font-medium text-heading">{b.vehicle}</p>
                  <p className="text-sm text-muted">{b.dates}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-heading">{b.total.toLocaleString()} RWF</p>
                  <div className="flex items-center gap-0.5 mt-0.5">
                    {[...Array(b.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-warning text-warning" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Browse Vehicles", href: "/vehicles", icon: Car },
            { label: "View Trips", href: "/trips", icon: MapPin },
            { label: "Notifications", href: "/notifications", icon: Bell },
            { label: "Edit Profile", href: "/profile", icon: TrendingUp },
          ].map((a) => (
            <Link key={a.href} href={a.href}>
              <div className="bg-card rounded-[16px] border border-gray-100 shadow-sm p-4 text-center hover:shadow-md transition-shadow">
                <a.icon className="w-5 h-5 text-primary mx-auto" />
                <p className="mt-2 text-xs font-medium text-heading">{a.label}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
