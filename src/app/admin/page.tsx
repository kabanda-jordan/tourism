"use client";

import Link from "next/link";
import { Users, Car, DollarSign, Building, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, XCircle, Clock, ArrowRight, Shield } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "Total Users", value: "1,234", change: "+45 this month", up: true, icon: Users },
  { label: "Active Bookings", value: "89", change: "+12%", up: true, icon: Car },
  { label: "Total Revenue", value: "28.5M RWF", change: "+18%", up: true, icon: DollarSign },
  { label: "Active Companies", value: "32", change: "+3", up: true, icon: Building },
];

const pendingApprovals = [
  { type: "company", name: "Safari Express Ltd", request: "Company registration", time: "2 hours ago" },
  { type: "vehicle", name: "Toyota Land Cruiser 2024", request: "Vehicle listing approval", time: "5 hours ago" },
  { type: "driver", name: "Emmanuel Habimana", request: "Driver verification", time: "1 day ago" },
];

const recentActivity = [
  { action: "New booking", detail: "RW-A1B2C3 by John Doe", time: "30 min ago", type: "info" },
  { action: "Payment received", detail: "325,000 RWF for RW-A1B2C3", time: "30 min ago", type: "success" },
  { action: "Vehicle added", detail: "Mercedes-Benz E-Class by Rwanda Car Rentals", time: "2 hours ago", type: "info" },
  { action: "Dispute filed", detail: "RW-X1Y2Z3 — vehicle condition mismatch", time: "3 hours ago", type: "warning" },
  { action: "Company registered", detail: "Kigali Premium Cars", time: "5 hours ago", type: "info" },
];

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-heading flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              Admin Dashboard
            </h1>
            <p className="text-sm text-muted mt-1">Platform overview and management</p>
          </div>
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

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pending Approvals */}
          <div className="lg:col-span-2 bg-card rounded-[16px] border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-heading">Pending Approvals</h2>
              <Link href="/admin/verifications" className="text-sm text-primary hover:underline flex items-center gap-1">
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-3">
              {pendingApprovals.map((a, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-[12px] bg-warning/5 border border-warning/10">
                  <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-warning" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-heading">{a.name}</p>
                    <p className="text-xs text-muted">{a.request} · {a.time}</p>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button className="p-1.5 rounded-lg bg-success/10 hover:bg-success/20">
                      <CheckCircle className="w-4 h-4 text-success" />
                    </button>
                    <button className="p-1.5 rounded-lg bg-error/10 hover:bg-error/20">
                      <XCircle className="w-4 h-4 text-error" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-card rounded-[16px] border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-heading mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {recentActivity.map((a, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                    a.type === "success" ? "bg-success" : a.type === "warning" ? "bg-warning" : "bg-primary"
                  }`} />
                  <div>
                    <p className="text-sm font-medium text-heading">{a.action}</p>
                    <p className="text-xs text-muted">{a.detail}</p>
                    <p className="text-[10px] text-muted mt-0.5">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          {[
            { label: "Users", href: "/admin/users", icon: Users },
            { label: "Companies", href: "/admin/companies", icon: Building },
            { label: "Vehicles", href: "/admin/vehicles", icon: Car },
            { label: "Payments", href: "/admin/payments", icon: DollarSign },
            { label: "Verifications", href: "/admin/verifications", icon: AlertTriangle },
            { label: "Settings", href: "/admin/settings", icon: Shield },
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
