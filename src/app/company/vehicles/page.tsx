"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search, Filter, Car, Edit, Trash2, Eye, MoreVertical, Check, X } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const vehicles = [
  { id: "1", name: "Toyota RAV4 2024", category: "SUV", seats: 5, price: 65000, status: "available", bookings: 12, image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=300&q=80" },
  { id: "2", name: "Land Rover Defender", category: "SUV", seats: 7, price: 120000, status: "available", bookings: 8, image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=300&q=80" },
  { id: "3", name: "Toyota Hilux 2023", category: "Truck", seats: 5, price: 55000, status: "rented", bookings: 15, image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=300&q=80" },
  { id: "4", name: "Mercedes-Benz V-Class", category: "Van", seats: 7, price: 85000, status: "maintenance", bookings: 6, image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=300&q=80" },
  { id: "5", name: "Toyota Prado 2024", category: "SUV", seats: 7, price: 90000, status: "available", bookings: 10, image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=300&q=80" },
];

const statusConfig: Record<string, { label: string; color: string }> = {
  available: { label: "Available", color: "bg-success/10 text-success" },
  rented: { label: "Rented", color: "bg-primary/10 text-primary" },
  maintenance: { label: "Maintenance", color: "bg-warning/10 text-warning" },
};

export default function CompanyVehiclesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = vehicles.filter((v) => {
    if (statusFilter !== "all" && v.status !== statusFilter) return false;
    if (search && !v.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Company", href: "/company" }, { label: "Vehicles" }]} />

        <div className="mt-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-heading">My Vehicles</h1>
          <Link href="/company/vehicles/new">
            <Button>
              <Plus className="w-4 h-4" />
              Add Vehicle
            </Button>
          </Link>
        </div>

        {/* Search & Filters */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="text"
              placeholder="Search vehicles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-[12px] border border-gray-200 text-sm focus:border-primary focus:outline-none"
            />
          </div>
          <div className="flex gap-2">
            {["all", "available", "rented", "maintenance"].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={cn(
                  "px-3 py-2 rounded-[10px] text-xs font-medium capitalize transition-colors",
                  statusFilter === s ? "bg-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Vehicles Grid */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((v) => (
            <div key={v.id} className="bg-card rounded-[16px] border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative">
                <img src={v.image} alt={v.name} className="w-full h-40 object-cover" />
                <span className={`absolute top-3 right-3 text-xs px-2 py-0.5 rounded-full ${statusConfig[v.status].color}`}>
                  {statusConfig[v.status].label}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-heading">{v.name}</h3>
                <div className="flex items-center gap-3 mt-1 text-xs text-muted">
                  <span>{v.category}</span>
                  <span>{v.seats} seats</span>
                  <span>{v.bookings} bookings</span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-primary font-bold">{v.price.toLocaleString()} RWF<span className="text-xs font-normal text-muted">/day</span></p>
                  <div className="flex gap-1">
                    <Link href={`/company/vehicles/${v.id}`}>
                      <button className="p-1.5 rounded-lg hover:bg-gray-100">
                        <Eye className="w-4 h-4 text-muted" />
                      </button>
                    </Link>
                    <button className="p-1.5 rounded-lg hover:bg-gray-100">
                      <Edit className="w-4 h-4 text-muted" />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-error/10">
                      <Trash2 className="w-4 h-4 text-error" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
