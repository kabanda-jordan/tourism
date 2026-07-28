"use client";

import Link from "next/link";
import { Car, DollarSign, Calendar, Users, TrendingUp, TrendingDown, ArrowUpRight, ArrowRight, Clock, AlertCircle } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const stats = [
  { label: "Total Revenue", value: "4.2M RWF", change: "+12%", up: true, icon: DollarSign },
  { label: "Active Bookings", value: "18", change: "+3", up: true, icon: Calendar },
  { label: "Total Vehicles", value: "24", change: "+2", up: true, icon: Car },
  { label: "Total Customers", value: "156", change: "+8%", up: true, icon: Users },
];

const recentBookings = [
  { id: "RW-A1B2C3", customer: "John Doe", vehicle: "Toyota RAV4 2024", dates: "Mar 15-20", amount: 325000, status: "confirmed" },
  { id: "RW-D4E5F6", customer: "Sarah Kim", vehicle: "Land Rover Defender", dates: "Mar 18-22", amount: 420000, status: "pending" },
  { id: "RW-G7H8I9", customer: "Pierre Nkurunziza", vehicle: "Toyota Hilux", dates: "Mar 20-25", amount: 275000, status: "confirmed" },
];

const alerts = [
  { type: "warning", message: "2 vehicles need maintenance service", action: "View" },
  { type: "info", message: "3 new booking requests pending approval", action: "Review" },
];

const monthlyRevenue = [
  { month: "Oct", value: 3200000 },
  { month: "Nov", value: 3800000 },
  { month: "Dec", value: 4500000 },
  { month: "Jan", value: 3900000 },
  { month: "Feb", value: 4100000 },
  { month: "Mar", value: 4200000 },
];

export default function CompanyDashboardPage() {
  const maxRevenue = Math.max(...monthlyRevenue.map((m) => m.value));

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-heading">Company Dashboard</h1>
            <p className="text-sm text-muted mt-1">Rwanda Car Rentals</p>
          </div>
          <Link href="/company/vehicles/new">
            <Button>
              <Car className="w-4 h-4" />
              Add Vehicle
            </Button>
          </Link>
        </div>

        {/* Alerts */}
        <div className="mt-6 space-y-2">
          {alerts.map((a, i) => (
            <div key={i} className={`flex items-center justify-between p-3 rounded-[12px] text-sm ${
              a.type === "warning" ? "bg-warning/10 text-warning" : "bg-primary/5 text-primary"
            }`}>
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <span>{a.message}</span>
              </div>
              <button className="font-medium hover:underline">{a.action}</button>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-card rounded-[16px] border border-gray-100 shadow-sm p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                  <s.icon className="w-5 h-5 text-primary" />
                </div>
                <span className={`text-xs font-medium flex items-center gap-0.5 ${s.up ? "text-success" : "text-error"}`}>
                  {s.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {s.change}
                </span>
              </div>
              <p className="mt-3 text-2xl font-bold text-heading">{s.value}</p>
              <p className="text-xs text-muted">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Revenue Chart (simple bar) */}
        <div className="mt-6 bg-card rounded-[16px] border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-heading">Monthly Revenue</h2>
          <div className="mt-4 flex items-end gap-3 h-40">
            {monthlyRevenue.map((m) => (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] text-muted">{(m.value / 1000000).toFixed(1)}M</span>
                <div
                  className="w-full bg-primary/20 rounded-t-lg relative"
                  style={{ height: `${(m.value / maxRevenue) * 100}%` }}
                >
                  <div className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-lg" style={{ height: `${(m.value / maxRevenue) * 100}%` }} />
                </div>
                <span className="text-xs text-muted">{m.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="mt-6 bg-card rounded-[16px] border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-heading">Recent Bookings</h2>
            <Link href="/company/reservations" className="text-sm text-primary hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2 text-xs text-muted font-medium">ID</th>
                  <th className="text-left py-2 text-xs text-muted font-medium">Customer</th>
                  <th className="text-left py-2 text-xs text-muted font-medium">Vehicle</th>
                  <th className="text-left py-2 text-xs text-muted font-medium">Dates</th>
                  <th className="text-left py-2 text-xs text-muted font-medium">Amount</th>
                  <th className="text-left py-2 text-xs text-muted font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((b) => (
                  <tr key={b.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-3 font-mono text-xs">{b.id}</td>
                    <td className="py-3 text-heading">{b.customer}</td>
                    <td className="py-3 text-body">{b.vehicle}</td>
                    <td className="py-3 text-muted">{b.dates}</td>
                    <td className="py-3 font-medium text-heading">{b.amount.toLocaleString()} RWF</td>
                    <td className="py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        b.status === "confirmed" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                      }`}>
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Vehicles", href: "/company/vehicles", icon: Car },
            { label: "Reservations", href: "/company/reservations", icon: Calendar },
            { label: "Analytics", href: "/company/analytics", icon: TrendingUp },
            { label: "Messages", href: "/messages", icon: Users },
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
