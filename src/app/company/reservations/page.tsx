"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, Search, Filter, Check, X, Clock, Eye, ChevronDown } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const reservations = [
  { id: "RW-A1B2C3", customer: "John Doe", email: "john@example.com", vehicle: "Toyota RAV4 2024", dates: "Mar 15-20, 2025", days: 5, amount: 325000, status: "confirmed", created: "Mar 10" },
  { id: "RW-D4E5F6", customer: "Sarah Kim", email: "sarah@example.com", vehicle: "Land Rover Defender", dates: "Mar 18-22, 2025", days: 4, amount: 420000, status: "pending", created: "Mar 12" },
  { id: "RW-G7H8I9", customer: "Pierre Nkurunziza", email: "pierre@example.com", vehicle: "Toyota Hilux", dates: "Mar 20-25, 2025", days: 5, amount: 275000, status: "confirmed", created: "Mar 13" },
  { id: "RW-J0K1L2", customer: "Alice Mutoni", email: "alice@example.com", vehicle: "Toyota RAV4 2024", dates: "Mar 25-28, 2025", days: 3, amount: 195000, status: "pending", created: "Mar 14" },
  { id: "RW-M3N4O5", customer: "David Uwimana", email: "david@example.com", vehicle: "Mercedes-Benz V-Class", dates: "Apr 1-5, 2025", days: 5, amount: 425000, status: "cancelled", created: "Mar 8" },
];

export default function CompanyReservationsPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const filtered = reservations.filter((r) => statusFilter === "all" || r.status === statusFilter);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Company", href: "/company" }, { label: "Reservations" }]} />

        <div className="mt-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-heading">Reservations</h1>
          <div className="flex items-center gap-2 text-sm text-muted">
            <span className="text-success font-medium">{reservations.filter((r) => r.status === "confirmed").length} confirmed</span>
            <span>·</span>
            <span className="text-warning font-medium">{reservations.filter((r) => r.status === "pending").length} pending</span>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {["all", "pending", "confirmed", "cancelled"].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-colors whitespace-nowrap",
                statusFilter === s ? "bg-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="mt-6 bg-card rounded-[16px] border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-4 py-3 text-xs text-muted font-medium">Booking ID</th>
                  <th className="text-left px-4 py-3 text-xs text-muted font-medium">Customer</th>
                  <th className="text-left px-4 py-3 text-xs text-muted font-medium">Vehicle</th>
                  <th className="text-left px-4 py-3 text-xs text-muted font-medium">Dates</th>
                  <th className="text-left px-4 py-3 text-xs text-muted font-medium">Amount</th>
                  <th className="text-left px-4 py-3 text-xs text-muted font-medium">Status</th>
                  <th className="text-left px-4 py-3 text-xs text-muted font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-4 py-3 font-mono text-xs">{r.id}</td>
                    <td className="px-4 py-3">
                      <p className="text-heading">{r.customer}</p>
                      <p className="text-xs text-muted">{r.email}</p>
                    </td>
                    <td className="px-4 py-3 text-body">{r.vehicle}</td>
                    <td className="px-4 py-3 text-muted text-xs">{r.dates}</td>
                    <td className="px-4 py-3 font-medium text-heading">{r.amount.toLocaleString()} RWF</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        r.status === "confirmed" ? "bg-success/10 text-success" :
                        r.status === "pending" ? "bg-warning/10 text-warning" :
                        "bg-error/10 text-error"
                      }`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        {r.status === "pending" && (
                          <>
                            <button className="p-1.5 rounded-lg hover:bg-success/10" title="Approve">
                              <Check className="w-4 h-4 text-success" />
                            </button>
                            <button className="p-1.5 rounded-lg hover:bg-error/10" title="Reject">
                              <X className="w-4 h-4 text-error" />
                            </button>
                          </>
                        )}
                        <button className="p-1.5 rounded-lg hover:bg-gray-100" title="View">
                          <Eye className="w-4 h-4 text-muted" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
