"use client";

import { Building, Search, CheckCircle, XCircle, Eye, MoreVertical } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const companies = [
  { id: "1", name: "Rwanda Car Rentals", email: "info@rwandacar.com", vehicles: 12, status: "active", joinDate: "Dec 2024", revenue: "2.1M RWF", rating: 4.7 },
  { id: "2", name: "Safari Adventures", email: "info@safari.rw", vehicles: 8, status: "active", joinDate: "Jan 2025", revenue: "1.5M RWF", rating: 4.8 },
  { id: "3", name: "Kigali Premium Cars", email: "info@kigalicars.com", vehicles: 5, status: "suspended", joinDate: "Nov 2024", revenue: "650K RWF", rating: 4.2 },
  { id: "4", name: "Rwanda Express Rentals", email: "info@rwexpress.com", vehicles: 6, status: "pending", joinDate: "Mar 2025", revenue: "—", rating: 0 },
];

export default function AdminCompaniesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Admin", href: "/admin" }, { label: "Companies" }]} />
        <div className="mt-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-heading">Companies</h1>
          <p className="text-sm text-muted">{companies.length} registered</p>
        </div>

        <div className="mt-6 bg-card rounded-[16px] border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-4 py-3 text-xs text-muted font-medium">Company</th>
                  <th className="text-left px-4 py-3 text-xs text-muted font-medium">Vehicles</th>
                  <th className="text-left px-4 py-3 text-xs text-muted font-medium">Revenue</th>
                  <th className="text-left px-4 py-3 text-xs text-muted font-medium">Rating</th>
                  <th className="text-left px-4 py-3 text-xs text-muted font-medium">Status</th>
                  <th className="text-left px-4 py-3 text-xs text-muted font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {companies.map((c) => (
                  <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <p className="font-medium text-heading">{c.name}</p>
                      <p className="text-xs text-muted">{c.email} · Since {c.joinDate}</p>
                    </td>
                    <td className="px-4 py-3 text-heading">{c.vehicles}</td>
                    <td className="px-4 py-3 text-heading">{c.revenue}</td>
                    <td className="px-4 py-3">{c.rating > 0 ? <span className="text-warning font-medium">{c.rating} ★</span> : <span className="text-muted">—</span>}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${c.status === "active" ? "bg-success/10 text-success" : c.status === "pending" ? "bg-warning/10 text-warning" : "bg-error/10 text-error"}`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-gray-100"><Eye className="w-4 h-4 text-muted" /></button>
                        {c.status === "pending" && <button className="p-1.5 rounded-lg hover:bg-success/10"><CheckCircle className="w-4 h-4 text-success" /></button>}
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
