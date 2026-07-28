"use client";

import Link from "next/link";
import { Calendar, DollarSign, Star, Clock, MapPin, TrendingUp, CheckCircle, AlertCircle, Car } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "Total Earnings", value: "1.8M RWF", change: "+15% this month", icon: DollarSign, up: true },
  { label: "Completed Rides", value: "42", change: "+5 this month", icon: CheckCircle, up: true },
  { label: "Average Rating", value: "4.8", change: "From 38 reviews", icon: Star, up: true },
  { label: "Pending Payouts", value: "285K RWF", change: "3 rides", icon: Clock, up: true },
];

const upcomingRides = [
  { id: "RIDE-001", tourist: "John Doe", vehicle: "Toyota RAV4 2024", route: "Kigali → Volcanoes NP", date: "Mar 15, 2025", time: "8:00 AM", amount: 65000 },
  { id: "RIDE-002", tourist: "Sarah Kim", vehicle: "Land Rover Defender", route: "Airport → Kigali City", date: "Mar 16, 2025", time: "2:00 PM", amount: 35000 },
];

const recentEarnings = [
  { date: "Mar 12", ride: "Kigali → Akagera", amount: 55000, status: "paid" },
  { date: "Mar 10", ride: "Musanze City Tour", amount: 40000, status: "paid" },
  { date: "Mar 8", ride: "Airport Transfer", amount: 25000, status: "paid" },
  { date: "Mar 5", ride: "Kigali → Lake Kivu", amount: 75000, status: "paid" },
];

export default function DriverDashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-heading">Driver Dashboard</h1>
            <p className="text-sm text-muted mt-1">Welcome back, Emmanuel</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-sm text-success">
              <div className="w-2 h-2 rounded-full bg-success" />
              Online
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-card rounded-[16px] border border-gray-100 shadow-sm p-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                <s.icon className="w-5 h-5 text-primary" />
              </div>
              <p className="mt-3 text-2xl font-bold text-heading">{s.value}</p>
              <p className="text-xs text-muted">{s.label}</p>
              <p className="text-xs text-success mt-1">{s.change}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Rides */}
          <div className="lg:col-span-2 bg-card rounded-[16px] border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-heading mb-4">Upcoming Rides</h2>
            <div className="space-y-3">
              {upcomingRides.map((r) => (
                <div key={r.id} className="flex items-center gap-4 p-3 rounded-[12px] bg-primary/5 border border-primary/10">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Car className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-heading">{r.tourist}</p>
                    <p className="text-xs text-muted flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {r.route}
                    </p>
                    <p className="text-xs text-muted">{r.date} at {r.time}</p>
                  </div>
                  <p className="text-sm font-bold text-primary shrink-0">{r.amount.toLocaleString()} RWF</p>
                </div>
              ))}
              {upcomingRides.length === 0 && (
                <div className="text-center py-8">
                  <Calendar className="w-8 h-8 text-gray-300 mx-auto" />
                  <p className="mt-2 text-sm text-muted">No upcoming rides</p>
                </div>
              )}
            </div>
          </div>

          {/* Recent Earnings */}
          <div className="bg-card rounded-[16px] border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-heading mb-4">Recent Earnings</h2>
            <div className="space-y-3">
              {recentEarnings.map((e, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="text-heading">{e.ride}</p>
                    <p className="text-xs text-muted">{e.date}</p>
                  </div>
                  <span className="text-success font-medium">+{e.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
            <Link href="/driver/earnings" className="mt-4 block text-sm text-primary hover:underline text-center">
              View all earnings →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
