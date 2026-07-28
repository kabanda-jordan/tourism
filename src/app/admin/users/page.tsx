"use client";

import { useState } from "react";
import { Search, Shield, MoreVertical, Check, X, Mail, Phone, ChevronDown } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const users = [
  { id: "1", name: "John Doe", email: "john@example.com", phone: "+250 788 123 456", role: "tourist", status: "active", joinDate: "Jan 15, 2025", bookings: 4 },
  { id: "2", name: "Rwanda Car Rentals", email: "info@rwandacar.com", phone: "+250 722 987 654", role: "company", status: "active", joinDate: "Dec 1, 2024", bookings: 48 },
  { id: "3", name: "Emmanuel Habimana", email: "emmanuel@example.com", phone: "+250 733 456 789", role: "driver", status: "pending", joinDate: "Mar 10, 2025", bookings: 0 },
  { id: "4", name: "Sarah Kim", email: "sarah@example.com", phone: "+250 785 321 654", role: "tourist", status: "active", joinDate: "Feb 5, 2025", bookings: 2 },
  { id: "5", name: "Kigali Premium Cars", email: "info@kigalicars.com", phone: "+250 788 111 222", role: "company", status: "suspended", joinDate: "Nov 20, 2024", bookings: 12 },
];

const roleColors: Record<string, string> = {
  tourist: "bg-primary/10 text-primary",
  company: "bg-secondary/10 text-secondary",
  driver: "bg-success/10 text-success",
  admin: "bg-error/10 text-error",
};

const statusColors: Record<string, string> = {
  active: "bg-success/10 text-success",
  pending: "bg-warning/10 text-warning",
  suspended: "bg-error/10 text-error",
};

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const filtered = users.filter((u) => {
    if (roleFilter !== "all" && u.role !== roleFilter) return false;
    if (search && !u.name.toLowerCase().includes(search.toLowerCase()) && !u.email.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Admin", href: "/admin" }, { label: "Users" }]} />
        <div className="mt-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-heading">User Management</h1>
          <p className="text-sm text-muted">{users.length} total users</p>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input type="text" placeholder="Search users..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-[12px] border border-gray-200 text-sm focus:border-primary focus:outline-none" />
          </div>
          <div className="flex gap-2">
            {["all", "tourist", "company", "driver"].map((r) => (
              <button key={r} onClick={() => setRoleFilter(r)} className={cn("px-3 py-2 rounded-[10px] text-xs font-medium capitalize transition-colors", roleFilter === r ? "bg-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200")}>
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 bg-card rounded-[16px] border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-4 py-3 text-xs text-muted font-medium">User</th>
                  <th className="text-left px-4 py-3 text-xs text-muted font-medium">Role</th>
                  <th className="text-left px-4 py-3 text-xs text-muted font-medium">Status</th>
                  <th className="text-left px-4 py-3 text-xs text-muted font-medium">Joined</th>
                  <th className="text-left px-4 py-3 text-xs text-muted font-medium">Bookings</th>
                  <th className="text-left px-4 py-3 text-xs text-muted font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u) => (
                  <tr key={u.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <p className="font-medium text-heading">{u.name}</p>
                      <p className="text-xs text-muted">{u.email}</p>
                    </td>
                    <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded-full capitalize ${roleColors[u.role]}`}>{u.role}</span></td>
                    <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded-full capitalize ${statusColors[u.status]}`}>{u.status}</span></td>
                    <td className="px-4 py-3 text-muted text-xs">{u.joinDate}</td>
                    <td className="px-4 py-3 text-heading">{u.bookings}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-gray-100" title="Email"><Mail className="w-4 h-4 text-muted" /></button>
                        {u.status === "pending" && <button className="p-1.5 rounded-lg hover:bg-success/10" title="Approve"><Check className="w-4 h-4 text-success" /></button>}
                        {u.status === "active" && <button className="p-1.5 rounded-lg hover:bg-error/10" title="Suspend"><X className="w-4 h-4 text-error" /></button>}
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
