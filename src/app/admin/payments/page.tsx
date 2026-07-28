"use client";

import { useState } from "react";
import { Search, DollarSign, Download, Filter, CheckCircle, Clock, XCircle, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const payments = [
  { id: "PAY-001", booking: "RW-A1B2C3", customer: "John Doe", company: "Rwanda Car Rentals", amount: 325000, fee: 16250, net: 308750, method: "Card", status: "completed", date: "Mar 15, 2025" },
  { id: "PAY-002", booking: "RW-D4E5F6", customer: "Sarah Kim", company: "Safari Adventures", amount: 420000, fee: 21000, net: 399000, method: "Mobile Money", status: "completed", date: "Mar 14, 2025" },
  { id: "PAY-003", booking: "RW-G7H8I9", customer: "Pierre Nkurunziza", company: "Kigali Tours", amount: 275000, fee: 13750, net: 261250, method: "Card", status: "pending", date: "Mar 13, 2025" },
  { id: "PAY-004", booking: "RW-X1Y2Z3", customer: "Alice Mutoni", company: "Rwanda Car Rentals", amount: 195000, fee: 9750, net: 185250, method: "Bank Transfer", status: "refunded", date: "Mar 10, 2025" },
];

const statusConfig: Record<string, { icon: typeof CheckCircle; color: string; bg: string }> = {
  completed: { icon: CheckCircle, color: "text-success", bg: "bg-success/10" },
  pending: { icon: Clock, color: "text-warning", bg: "bg-warning/10" },
  refunded: { icon: XCircle, color: "text-error", bg: "bg-error/10" },
};

export default function AdminPaymentsPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const filtered = payments.filter((p) => statusFilter === "all" || p.status === statusFilter);

  const totalRevenue = payments.filter((p) => p.status === "completed").reduce((sum, p) => sum + p.amount, 0);
  const totalFees = payments.filter((p) => p.status === "completed").reduce((sum, p) => sum + p.fee, 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Admin", href: "/admin" }, { label: "Payments" }]} />
        <div className="mt-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-heading">Payments</h1>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>

        {/* Summary */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-card rounded-[16px] border border-gray-100 shadow-sm p-4">
            <p className="text-sm text-muted">Total Revenue</p>
            <p className="text-2xl font-bold text-heading mt-1">{totalRevenue.toLocaleString()} RWF</p>
            <p className="text-xs text-success flex items-center gap-0.5 mt-1"><ArrowUpRight className="w-3 h-3" /> +18% this month</p>
          </div>
          <div className="bg-card rounded-[16px] border border-gray-100 shadow-sm p-4">
            <p className="text-sm text-muted">Platform Fees (5%)</p>
            <p className="text-2xl font-bold text-primary mt-1">{totalFees.toLocaleString()} RWF</p>
            <p className="text-xs text-success flex items-center gap-0.5 mt-1"><ArrowUpRight className="w-3 h-3" /> +12% this month</p>
          </div>
          <div className="bg-card rounded-[16px] border border-gray-100 shadow-sm p-4">
            <p className="text-sm text-muted">Pending Payouts</p>
            <p className="text-2xl font-bold text-warning mt-1">{payments.filter((p) => p.status === "pending").reduce((s, p) => s + p.net, 0).toLocaleString()} RWF</p>
            <p className="text-xs text-muted mt-1">{payments.filter((p) => p.status === "pending").length} transactions</p>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-4 flex gap-2">
          {["all", "completed", "pending", "refunded"].map((s) => (
            <button key={s} onClick={() => setStatusFilter(s)} className={cn("px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-colors", statusFilter === s ? "bg-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200")}>
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
                  <th className="text-left px-4 py-3 text-xs text-muted font-medium">ID</th>
                  <th className="text-left px-4 py-3 text-xs text-muted font-medium">Customer</th>
                  <th className="text-left px-4 py-3 text-xs text-muted font-medium">Company</th>
                  <th className="text-left px-4 py-3 text-xs text-muted font-medium">Amount</th>
                  <th className="text-left px-4 py-3 text-xs text-muted font-medium">Fee</th>
                  <th className="text-left px-4 py-3 text-xs text-muted font-medium">Method</th>
                  <th className="text-left px-4 py-3 text-xs text-muted font-medium">Status</th>
                  <th className="text-left px-4 py-3 text-xs text-muted font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => {
                  const sc = statusConfig[p.status];
                  return (
                    <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="px-4 py-3 font-mono text-xs">{p.id}</td>
                      <td className="px-4 py-3 text-heading">{p.customer}</td>
                      <td className="px-4 py-3 text-body text-xs">{p.company}</td>
                      <td className="px-4 py-3 font-medium text-heading">{p.amount.toLocaleString()} RWF</td>
                      <td className="px-4 py-3 text-muted">{p.fee.toLocaleString()} RWF</td>
                      <td className="px-4 py-3 text-xs text-muted">{p.method}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full capitalize flex items-center gap-1 w-fit ${sc.bg} ${sc.color}`}>
                          <sc.icon className="w-3 h-3" />
                          {p.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-muted">{p.date}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
