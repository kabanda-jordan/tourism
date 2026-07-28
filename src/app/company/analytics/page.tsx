"use client";

import { TrendingUp, DollarSign, Calendar, Car, Users, Star, Clock, ArrowUpRight } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

const stats = [
  { label: "Total Revenue", value: "4.2M RWF", trend: "+12% vs last month", icon: DollarSign },
  { label: "Avg Booking Value", value: "285K RWF", trend: "+5% vs last month", icon: TrendingUp },
  { label: "Utilization Rate", value: "72%", trend: "+8% vs last month", icon: Clock },
  { label: "Avg Rating", value: "4.7", trend: "From 48 reviews", icon: Star },
];

const monthlyData = [
  { month: "Oct", revenue: 3200000, bookings: 14 },
  { month: "Nov", revenue: 3800000, bookings: 16 },
  { month: "Dec", revenue: 4500000, bookings: 20 },
  { month: "Jan", revenue: 3900000, bookings: 17 },
  { month: "Feb", revenue: 4100000, bookings: 18 },
  { month: "Mar", revenue: 4200000, bookings: 19 },
];

const topVehicles = [
  { name: "Toyota RAV4 2024", bookings: 12, revenue: 780000, utilization: 82 },
  { name: "Land Rover Defender", bookings: 8, revenue: 960000, utilization: 75 },
  { name: "Toyota Hilux", bookings: 15, revenue: 825000, utilization: 88 },
  { name: "Mercedes-Benz V-Class", bookings: 6, revenue: 510000, utilization: 62 },
];

export default function CompanyAnalyticsPage() {
  const maxRevenue = Math.max(...monthlyData.map((m) => m.revenue));

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Company", href: "/company" }, { label: "Analytics" }]} />

        <div className="mt-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-heading">Analytics</h1>
          <select className="px-3 py-2 rounded-[10px] border border-gray-200 text-sm focus:border-primary focus:outline-none">
            <option>Last 6 months</option>
            <option>Last 12 months</option>
            <option>This year</option>
          </select>
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
              <p className="text-xs text-success mt-1">{s.trend}</p>
            </div>
          ))}
        </div>

        {/* Revenue Chart */}
        <div className="mt-6 bg-card rounded-[16px] border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-heading">Revenue Trend</h2>
          <div className="mt-4 flex items-end gap-3 h-48">
            {monthlyData.map((m) => (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] text-muted">{(m.revenue / 1000000).toFixed(1)}M</span>
                <div className="w-full relative" style={{ height: "100%" }}>
                  <div
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary to-primary/60 rounded-t-lg"
                    style={{ height: `${(m.revenue / maxRevenue) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-muted">{m.month}</span>
                <span className="text-[10px] text-muted">{m.bookings} bookings</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Vehicles */}
        <div className="mt-6 bg-card rounded-[16px] border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-heading mb-4">Top Performing Vehicles</h2>
          <div className="space-y-4">
            {topVehicles.map((v, i) => (
              <div key={v.name} className="flex items-center gap-4">
                <span className="text-sm font-bold text-muted w-6">#{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-heading">{v.name}</p>
                  <div className="flex items-center gap-3 text-xs text-muted mt-0.5">
                    <span>{v.bookings} bookings</span>
                    <span>{v.utilization}% utilization</span>
                  </div>
                </div>
                <p className="text-sm font-bold text-primary">{v.revenue.toLocaleString()} RWF</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
