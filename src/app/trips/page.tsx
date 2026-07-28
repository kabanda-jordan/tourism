"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, MapPin, Car, Clock, ChevronDown, Filter, Search, X } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const trips = [
  { id: "RW-A1B2C3", vehicle: "Toyota RAV4 2024", dates: "Mar 15 - Mar 20, 2025", days: 5, status: "upcoming", pickup: "Kigali City", dropoff: "Kigali Airport", total: 325000, image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=300&q=80" },
  { id: "RW-D4E5F6", vehicle: "Land Rover Defender", dates: "Apr 2 - Apr 5, 2025", days: 3, status: "upcoming", pickup: "Kigali Airport", dropoff: "Musanze", total: 420000, image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=300&q=80" },
  { id: "RW-G7H8I9", vehicle: "Toyota Hilux 2023", dates: "Jan 10 - Jan 15, 2025", days: 5, status: "completed", pickup: "Kigali City", dropoff: "Rubavu", total: 275000, image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=300&q=80" },
  { id: "RW-J0K1L2", vehicle: "Mercedes-Benz V-Class", dates: "Dec 20 - Dec 22, 2024", days: 2, status: "completed", pickup: "Kigali City", dropoff: "Kigali City", total: 180000, image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=300&q=80" },
];

const filters = ["all", "upcoming", "completed", "cancelled"];

export default function TripsPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTrips = trips.filter((t) => {
    if (activeFilter !== "all" && t.status !== activeFilter) return false;
    if (searchQuery && !t.vehicle.toLowerCase().includes(searchQuery.toLowerCase()) && !t.id.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "My Trips" }]} />

        <div className="mt-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-heading">My Trips</h1>
          <Link href="/vehicles">
            <Button size="sm">
              <Car className="w-4 h-4" />
              Book New
            </Button>
          </Link>
        </div>

        {/* Search */}
        <div className="mt-4 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text"
            placeholder="Search by vehicle or booking code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-[12px] border border-gray-200 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Filters */}
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-colors whitespace-nowrap",
                activeFilter === f ? "bg-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Trips List */}
        <div className="mt-6 space-y-4">
          {filteredTrips.map((trip) => (
            <Link key={trip.id} href={`/trips/${trip.id}`}>
              <div className="bg-card rounded-[16px] border border-gray-100 shadow-sm p-4 sm:p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row gap-4">
                  <img src={trip.image} alt={trip.vehicle} className="w-full sm:w-40 h-32 rounded-[12px] object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-heading">{trip.vehicle}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        trip.status === "upcoming" ? "bg-success/10 text-success" :
                        trip.status === "completed" ? "bg-gray-100 text-gray-500" : "bg-error/10 text-error"
                      }`}>
                        {trip.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted mt-1 font-mono">{trip.id}</p>
                    <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-1 text-muted">
                        <Calendar className="w-3.5 h-3.5" /> {trip.dates}
                      </div>
                      <div className="flex items-center gap-1 text-muted">
                        <Clock className="w-3.5 h-3.5" /> {trip.days} days
                      </div>
                      <div className="flex items-center gap-1 text-muted">
                        <MapPin className="w-3.5 h-3.5" /> {trip.pickup} → {trip.dropoff}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row sm:flex-col items-end justify-between sm:justify-center">
                    <p className="text-lg font-bold text-primary">{trip.total.toLocaleString()} RWF</p>
                    {trip.status === "upcoming" && (
                      <span className="text-xs text-success font-medium">Confirmed</span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
          {filteredTrips.length === 0 && (
            <div className="bg-card rounded-[16px] border border-dashed border-gray-200 p-12 text-center">
              <Car className="w-12 h-12 text-gray-300 mx-auto" />
              <p className="mt-3 text-sm text-muted">No trips found</p>
              <Link href="/vehicles">
                <Button size="sm" className="mt-3">Book a Vehicle</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
