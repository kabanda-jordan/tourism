"use client";

import Link from "next/link";
import { Users, Car, DollarSign, Building, TrendingUp, TrendingDown, CheckCircle, XCircle, Clock, Shield, ArrowRight, Search, Filter } from "lucide-react";

const metrics = [
  { label: "Total Users", value: "1,234", change: "+45", up: true, icon: Users },
  { label: "Active Bookings", value: "89", change: "+12%", up: true, icon: Car },
  { label: "Revenue MTD", value: "28.5M RWF", change: "+18%", up: true, icon: DollarSign },
  { label: "Companies", value: "32", change: "+3", up: true, icon: Building },
];

const pendingItems = [
  { type: "Company", name: "Safari Express Ltd", item: "Registration", time: "2h ago" },
  { type: "Vehicle", name: "Toyota Land Cruiser 2024", item: "Listing approval", time: "5h ago" },
  { type: "Driver", name: "Emmanuel Habimana", item: "Verification", time: "1d ago" },
  { type: "Company", name: "Kigali Premium Cars", item: "Registration", time: "2d ago" },
];

const recentActivity = [
  { action: "New booking RW-A1B2C3", detail: "John Doe · Toyota RAV4 · 325,000 RWF", time: "30m ago", type: "create" },
  { action: "Payment received", detail: "325,000 RWF — Flutterwave", time: "30m ago", type: "payment" },
  { action: "Vehicle added", detail: "Mercedes E-Class by Rwanda Car Rentals", time: "2h ago", type: "add" },
  { action: "Dispute filed RW-X1Y2Z3", detail: "Vehicle condition mismatch", time: "3h ago", type: "dispute" },
  { action: "Driver verified", detail: "Emmanuel Habimana — approved", time: "4h ago", type: "approve" },
  { action: "Company registered", detail: "Kigali Premium Cars", time: "5h ago", type: "add" },
];

export default function AdminDashboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Admin Console</h1>
            </div>
            <p className="text-sm text-gray-500 mt-1">Platform overview — {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-600 hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-600 hover:bg-gray-50 transition-colors">
              <Search className="w-4 h-4" />
              Search
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((m) => (
            <div key={m.label} className="bg-white rounded-xl border border-gray-200 px-5 py-4">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-lg bg-teal-50 flex items-center justify-center">
                  <m.icon className="w-4.5 h-4.5 text-teal-600" />
                </div>
                <span className={`text-xs font-semibold flex items-center gap-0.5 ${m.up ? "text-emerald-600" : "text-red-600"}`}>
                  {m.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {m.change}
                </span>
              </div>
              <p className="mt-3 text-2xl font-bold text-gray-900">{m.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{m.label}</p>
            </div>
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pending & Activity — span 2 */}
          <div className="lg:col-span-2 space-y-6">
            {/* Pending Approvals */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-500" />
                  Pending Approvals
                  <span className="text-[11px] font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">4</span>
                </h2>
                <Link href="/admin/verifications" className="text-sm text-teal-600 hover:text-teal-700 font-medium">
                  View all →
                </Link>
              </div>
              <div className="divide-y divide-gray-50">
                {pendingItems.map((item, i) => (
                  <div key={i} className="px-5 py-3.5 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4 text-amber-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.type} · {item.item} · {item.time}</p>
                    </div>
                    <div className="flex gap-1.5 shrink-0">
                      <button className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                      </button>
                      <button className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 transition-colors">
                        <XCircle className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent System Activity */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-900">System Activity</h2>
              </div>
              <div className="divide-y divide-gray-50">
                {recentActivity.map((a, i) => (
                  <div key={i} className="px-5 py-3 flex items-start gap-3 hover:bg-gray-50 transition-colors">
                    <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                      a.type === "payment" ? "bg-emerald-400" :
                      a.type === "dispute" ? "bg-amber-400" :
                      a.type === "approve" ? "bg-blue-400" :
                      a.type === "add" ? "bg-purple-400" : "bg-gray-400"
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{a.action}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{a.detail}</p>
                    </div>
                    <span className="text-[11px] text-gray-400 shrink-0">{a.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Platform Health */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="font-semibold text-gray-900 mb-4">Platform Health</h2>
              <div className="space-y-3">
                {[
                  { label: "Uptime", value: "99.9%", color: "emerald" },
                  { label: "API Response", value: "210ms", color: "emerald" },
                  { label: "Active Users", value: "342", color: "blue" },
                  { label: "Error Rate", value: "0.02%", color: "emerald" },
                ].map((h) => (
                  <div key={h.label} className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">{h.label}</p>
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full bg-${h.color}-400`} />
                      <span className={`text-sm font-semibold text-${h.color}-600`}>{h.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Access */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="font-semibold text-gray-900 mb-4">Quick Access</h2>
              <div className="space-y-1">
                {[
                  { label: "Users", href: "/admin/users", icon: Users },
                  { label: "Companies", href: "/admin/companies", icon: Building },
                  { label: "Vehicles", href: "/admin/vehicles", icon: Car },
                  { label: "Payments", href: "/admin/payments", icon: DollarSign },
                  { label: "Verifications", href: "/admin/verifications", icon: Clock },
                ].map((l) => (
                  <Link key={l.href} href={l.href}>
                    <div className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-md bg-teal-50 flex items-center justify-center">
                          <l.icon className="w-3.5 h-3.5 text-teal-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">{l.label}</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-gray-300" />
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
