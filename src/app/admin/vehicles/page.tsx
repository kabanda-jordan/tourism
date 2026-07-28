"use client";

import { useState } from "react";
import { Car, Search, Eye, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { cn } from "@/lib/utils";

const vehicles = [
  { id: "1", name: "Toyota RAV4 2024", company: "Rwanda Car Rentals", category: "SUV", price: 65000, status: "active", bookings: 12, image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=200&q=80" },
  { id: "2", name: "Land Rover Defender", company: "Safari Adventures", category: "SUV", price: 120000, status: "active", bookings: 8, image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=200&q=80" },
  { id: "3", name: "Toyota Land Cruiser 2024", company: "Rwanda Car Rentals", category: "SUV", price: 150000, status: "pending", bookings: 0, image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=200&q=80" },
  { id: "4", name: "Toyota Hilux 2023", company: "Kigali Tours", category: "Truck", price: 55000, status: "active", bookings: 15, image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=200&q=80" },
];

export default function AdminVehiclesPage() {
  const [filter, setFilter] = useState("all");
  const filtered = vehicles.filter((v) => filter === "all" || v.status === filter);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Admin", href: "/admin" }, { label: "Vehicles" }]} />
        <div className="mt-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-heading">All Vehicles</h1>
          <span className="text-sm text-muted">{vehicles.length} total</span>
        </div>

        <div className="mt-4 flex gap-2">
          {["all", "active", "pending", "flagged"].map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={cn("px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-colors", filter === f ? "bg-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200")}>
              {f}
            </button>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((v) => (
            <div key={v.id} className="bg-card rounded-[16px] border border-gray-100 shadow-sm overflow-hidden">
              <div className="relative">
                <img src={v.image} alt={v.name} className="w-full h-36 object-cover" />
                <span className={`absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full ${v.status === "active" ? "bg-success/10 text-success" : v.status === "pending" ? "bg-warning/10 text-warning" : "bg-error/10 text-error"}`}>
                  {v.status}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-heading">{v.name}</h3>
                <p className="text-xs text-muted">{v.company} · {v.category}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm font-bold text-primary">{v.price.toLocaleString()} RWF/day</span>
                  <span className="text-xs text-muted">{v.bookings} bookings</span>
                </div>
                <div className="mt-3 flex gap-1">
                  {v.status === "pending" && (
                    <>
                      <button className="flex-1 p-1.5 rounded-lg bg-success/10 text-success text-xs font-medium hover:bg-success/20 flex items-center justify-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Approve
                      </button>
                      <button className="flex-1 p-1.5 rounded-lg bg-error/10 text-error text-xs font-medium hover:bg-error/20 flex items-center justify-center gap-1">
                        <XCircle className="w-3 h-3" /> Reject
                      </button>
                    </>
                  )}
                  {v.status === "active" && (
                    <button className="flex-1 p-1.5 rounded-lg bg-warning/10 text-warning text-xs font-medium hover:bg-warning/20 flex items-center justify-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> Flag
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
