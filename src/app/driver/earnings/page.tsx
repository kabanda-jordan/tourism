"use client";

import { DollarSign, TrendingUp, Calendar, Download } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";

const earnings = [
  { date: "Mar 12, 2025", ride: "Kigali → Akagera NP", tourist: "John D.", amount: 55000, status: "paid", payoutDate: "Mar 15" },
  { date: "Mar 10, 2025", ride: "Musanze City Tour", tourist: "Sarah K.", amount: 40000, status: "paid", payoutDate: "Mar 13" },
  { date: "Mar 8, 2025", ride: "Airport Transfer", tourist: "Pierre N.", amount: 25000, status: "paid", payoutDate: "Mar 11" },
  { date: "Mar 5, 2025", ride: "Kigali → Lake Kivu", tourist: "Alice M.", amount: 75000, status: "paid", payoutDate: "Mar 8" },
  { date: "Mar 3, 2025", ride: "Volcanoes NP Trek", tourist: "David U.", amount: 85000, status: "pending", payoutDate: "—" },
  { date: "Mar 1, 2025", ride: "Kigali City Tour", tourist: "Emma H.", amount: 30000, status: "pending", payoutDate: "—" },
];

export default function DriverEarningsPage() {
  const totalEarned = earnings.reduce((s, e) => s + e.amount, 0);
  const paidOut = earnings.filter((e) => e.status === "paid").reduce((s, e) => s + e.amount, 0);
  const pending = earnings.filter((e) => e.status === "pending").reduce((s, e) => s + e.amount, 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Driver", href: "/driver" }, { label: "Earnings" }]} />

        <div className="mt-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-heading">Earnings</h1>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>

        {/* Summary */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-card rounded-[16px] border border-gray-100 shadow-sm p-4">
            <p className="text-sm text-muted">Total Earned</p>
            <p className="text-2xl font-bold text-heading mt-1">{totalEarned.toLocaleString()} RWF</p>
          </div>
          <div className="bg-card rounded-[16px] border border-gray-100 shadow-sm p-4">
            <p className="text-sm text-muted">Paid Out</p>
            <p className="text-2xl font-bold text-success mt-1">{paidOut.toLocaleString()} RWF</p>
          </div>
          <div className="bg-card rounded-[16px] border border-gray-100 shadow-sm p-4">
            <p className="text-sm text-muted">Pending</p>
            <p className="text-2xl font-bold text-warning mt-1">{pending.toLocaleString()} RWF</p>
          </div>
        </div>

        {/* Table */}
        <div className="mt-6 bg-card rounded-[16px] border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-4 py-3 text-xs text-muted font-medium">Date</th>
                  <th className="text-left px-4 py-3 text-xs text-muted font-medium">Ride</th>
                  <th className="text-left px-4 py-3 text-xs text-muted font-medium">Tourist</th>
                  <th className="text-left px-4 py-3 text-xs text-muted font-medium">Amount</th>
                  <th className="text-left px-4 py-3 text-xs text-muted font-medium">Status</th>
                  <th className="text-left px-4 py-3 text-xs text-muted font-medium">Payout</th>
                </tr>
              </thead>
              <tbody>
                {earnings.map((e, i) => (
                  <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-4 py-3 text-muted text-xs">{e.date}</td>
                    <td className="px-4 py-3 text-heading">{e.ride}</td>
                    <td className="px-4 py-3 text-body">{e.tourist}</td>
                    <td className="px-4 py-3 font-medium text-heading">{e.amount.toLocaleString()} RWF</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${e.status === "paid" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>
                        {e.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted">{e.payoutDate}</td>
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
