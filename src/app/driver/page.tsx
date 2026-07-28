"use client";

import Link from "next/link";
import { DollarSign, Navigation, Star, Clock, Car, MapPin, TrendingUp, CheckCircle, ChevronRight, Bell } from "lucide-react";

const earningsData = [
  { day: "Mon", amount: 55000, rides: 3 },
  { day: "Tue", amount: 42000, rides: 2 },
  { day: "Wed", amount: 78000, rides: 4 },
  { day: "Thu", amount: 35000, rides: 2 },
  { day: "Fri", amount: 92000, rides: 5 },
  { day: "Sat", amount: 65000, rides: 3 },
  { day: "Sun", amount: 48000, rides: 2 },
];

const upcomingRides = [
  { id: "R-001", tourist: "John Doe", vehicle: "Toyota RAV4", route: "Kigali → Volcanoes NP", time: "8:00 AM", amount: 65000 },
  { id: "R-002", tourist: "Sarah Kim", vehicle: "Land Rover Defender", route: "Airport → Kigali", time: "2:00 PM", amount: 35000 },
  { id: "R-003", tourist: "Mike R.", vehicle: "Toyota Hilux", route: "Kigali → Lake Kivu", time: "6:00 AM", amount: 85000 },
];

export default function DriverDashboardPage() {
  return (
    <div className="min-h-screen" style={{ background: "#0A0F1E" }}>
      {/* Top Bar */}
      <div style={{ background: "#111827", borderBottom: "1px solid #1F2937" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white">Driver Dashboard</h1>
              <p className="text-sm text-gray-400">Welcome back, Emmanuel</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative text-gray-400 hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center">3</span>
              </button>
              <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl px-3 py-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm font-medium text-emerald-400">Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        {/* Big Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: "Today's Earnings", value: "65,000 RWF", sub: "+12% vs yesterday", icon: DollarSign, color: "#3B82F6" },
            { label: "This Week", value: "420,000 RWF", sub: "22 rides total", icon: TrendingUp, color: "#10B981" },
            { label: "Rating", value: "4.8", sub: "38 reviews", icon: Star, color: "#F59E0B" },
            { label: "Completed", value: "42", sub: "+5 this month", icon: CheckCircle, color: "#8B5CF6" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl p-4" style={{ background: "#111827", border: "1px solid #1F2937" }}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">{s.label}</p>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${s.color}15` }}>
                  <s.icon className="w-4 h-4" style={{ color: s.color }} />
                </div>
              </div>
              <p className="text-2xl font-bold text-white">{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Earnings Chart */}
        <div className="mt-6 rounded-2xl p-5" style={{ background: "#111827", border: "1px solid #1F2937" }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-white">This Week</h2>
            <span className="text-xs text-gray-500">Total: 420,000 RWF</span>
          </div>
          <div className="flex items-end gap-2 h-28">
            {earningsData.map((d) => {
              const maxAmount = Math.max(...earningsData.map((e) => e.amount));
              const height = (d.amount / maxAmount) * 100;
              return (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                  <div className="flex gap-0.5 w-full">
                    <div
                      className="w-1/2 rounded-t-md transition-all"
                      style={{ height: `${height * 0.6}%`, background: "linear-gradient(180deg, #3B82F6, #1D4ED8)" }}
                    />
                    <div
                      className="w-1/2 rounded-t-md transition-all"
                      style={{ height: `${height * 0.4}%`, background: "linear-gradient(180deg, #60A5FA, #3B82F6)" }}
                    />
                  </div>
                  <p className="text-[10px] text-gray-500 mt-1">{d.day}</p>
                  <p className="text-[9px] text-gray-600">{d.rides} rides</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Rides & Pending */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Rides */}
          <div className="rounded-2xl p-5" style={{ background: "#111827", border: "1px solid #1F2937" }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-white">Upcoming Rides</h2>
              <Link href="/driver/earnings" className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
                View all <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-2">
              {upcomingRides.map((r) => (
                <div key={r.id} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "#1A2332", border: "1px solid #1F2937" }}>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "#3B82F620" }}>
                    <Car className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-white">{r.tourist}</p>
                      <span className="text-[10px] text-gray-500">{r.time}</span>
                    </div>
                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                      <Navigation className="w-3 h-3 text-blue-400" /> {r.route}
                    </p>
                  </div>
                  <p className="text-sm font-bold text-emerald-400">{r.amount.toLocaleString()} <span className="text-[10px]">RWF</span></p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-2xl p-5" style={{ background: "#111827", border: "1px solid #1F2937" }}>
            <h2 className="text-base font-bold text-white mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { label: "Start Shift", desc: "Begin accepting rides", icon: Clock, color: "#10B981" },
                { label: "My Vehicles", desc: "Manage your fleet", icon: Car, color: "#3B82F6" },
                { label: "Earnings", desc: "View payouts", icon: DollarSign, color: "#F59E0B" },
                { label: "Verification", desc: "Update documents", icon: CheckCircle, color: "#8B5CF6" },
              ].map((a) => (
                <Link key={a.label} href="/driver/earnings">
                  <div className="p-3 rounded-xl transition-all hover:-translate-y-0.5" style={{ background: "#1A2332", border: "1px solid #1F2937" }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-2" style={{ background: `${a.color}20` }}>
                      <a.icon className="w-4 h-4" style={{ color: a.color }} />
                    </div>
                    <p className="text-sm font-semibold text-white">{a.label}</p>
                    <p className="text-[10px] text-gray-500">{a.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
