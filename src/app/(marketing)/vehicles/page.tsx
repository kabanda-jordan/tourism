"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { VehicleCard } from "@/components/composites/vehicle-card";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Modal } from "@/components/ui/modal";
import { cn } from "@/lib/utils";

const vehicles = [
  {
    id: "1",
    title: "Toyota Land Cruiser V8",
    images: ["https://images.unsplash.com/photo-1594611396050-13d7dc4bf0dc?w=800&q=80"],
    category: "SUV",
    transmission: "Automatic",
    seats: 7,
    fuelType: "Diesel",
    pricePerDay: 85000,
    location: "Kigali",
    rating: 4.9,
    totalReviews: 127,
    isFeatured: true,
  },
  {
    id: "2",
    title: "Mercedes-Benz GLC 300",
    images: ["https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80"],
    category: "Luxury",
    transmission: "Automatic",
    seats: 5,
    fuelType: "Petrol",
    pricePerDay: 120000,
    location: "Kigali",
    rating: 4.8,
    totalReviews: 89,
  },
  {
    id: "3",
    title: "Toyota Hiace Commuter",
    images: ["https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&q=80"],
    category: "Van",
    transmission: "Manual",
    seats: 14,
    fuelType: "Diesel",
    pricePerDay: 65000,
    location: "Musanze",
    rating: 4.7,
    totalReviews: 54,
  },
  {
    id: "4",
    title: "Subaru Forester",
    images: ["https://images.unsplash.com/photo-1568844293986-8d0400f4745b?w=800&q=80"],
    category: "SUV",
    transmission: "Automatic",
    seats: 5,
    fuelType: "Petrol",
    pricePerDay: 55000,
    location: "Kigali",
    rating: 4.6,
    totalReviews: 42,
  },
  {
    id: "5",
    title: "Toyota Coaster Bus",
    images: ["https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80"],
    category: "Bus",
    transmission: "Manual",
    seats: 30,
    fuelType: "Diesel",
    pricePerDay: 120000,
    location: "Kigali",
    rating: 4.5,
    totalReviews: 31,
  },
  {
    id: "6",
    title: "Range Rover Sport",
    images: ["https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80"],
    category: "Luxury",
    transmission: "Automatic",
    seats: 5,
    fuelType: "Diesel",
    pricePerDay: 180000,
    location: "Kigali",
    rating: 5.0,
    totalReviews: 63,
    isFeatured: true,
  },
  {
    id: "7",
    title: "Nissan Patrol",
    images: ["https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&q=80"],
    category: "SUV",
    transmission: "Automatic",
    seats: 7,
    fuelType: "Diesel",
    pricePerDay: 95000,
    location: "Rubavu",
    rating: 4.8,
    totalReviews: 38,
  },
  {
    id: "8",
    title: "Hyundai Staria",
    images: ["https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&q=80"],
    category: "Van",
    transmission: "Automatic",
    seats: 11,
    fuelType: "Diesel",
    pricePerDay: 75000,
    location: "Kigali",
    rating: 4.7,
    totalReviews: 22,
  },
  {
    id: "9",
    title: "Toyota RAV4",
    images: ["https://images.unsplash.com/photo-1568844293986-8d0400f4745b?w=800&q=80"],
    category: "SUV",
    transmission: "Automatic",
    seats: 5,
    fuelType: "Petrol",
    pricePerDay: 45000,
    location: "Kigali",
    rating: 4.5,
    totalReviews: 67,
  },
];

const categories = ["All", "SUV", "Luxury", "Van", "Bus", "Sedan"];
const locations = ["All Locations", "Kigali", "Musanze", "Rubavu", "Huye", "Kayonza"];
const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "reviews", label: "Most Reviewed" },
];

export default function VehiclesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [location, setLocation] = useState("All Locations");
  const [sort, setSort] = useState("featured");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const filteredVehicles = vehicles
    .filter((v) => {
      if (search && !v.title.toLowerCase().includes(search.toLowerCase())) return false;
      if (category !== "All" && v.category !== category) return false;
      if (location !== "All Locations" && v.location !== location) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sort) {
        case "price-low": return a.pricePerDay - b.pricePerDay;
        case "price-high": return b.pricePerDay - a.pricePerDay;
        case "rating": return b.rating - a.rating;
        case "reviews": return b.totalReviews - a.totalReviews;
        default: return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      }
    });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative h-64 bg-gradient-to-r from-primary to-primary-dark">
        <img
          src="https://images.unsplash.com/photo-1594611396050-13d7dc4bf0dc?w=1920&q=80"
          alt="Vehicle Fleet"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-3xl font-bold sm:text-4xl">Our Vehicle Fleet</h1>
            <p className="mt-2 text-white/80">
              Choose from {vehicles.length}+ premium vehicles for your Rwandan adventure
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Vehicles" }]} />

        {/* Search & Filters Bar */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
            <input
              type="text"
              placeholder="Search vehicles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-11 pl-10 pr-4 bg-card border border-gray-200 rounded-[12px] text-sm text-heading placeholder:text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
            />
          </div>

          <div className="flex gap-3">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-11 px-4 bg-card border border-gray-200 rounded-[12px] text-sm text-heading focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c === "All" ? "All Categories" : c}</option>
              ))}
            </select>

            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="h-11 px-4 bg-card border border-gray-200 rounded-[12px] text-sm text-heading focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              {locations.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="h-11 px-4 bg-card border border-gray-200 rounded-[12px] text-sm text-heading focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Category pills (mobile-friendly) */}
        <div className="mt-6 flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                category === c
                  ? "bg-primary text-white"
                  : "bg-card border border-gray-200 text-body hover:border-primary hover:text-primary"
              )}
            >
              {c === "All" ? "All Vehicles" : c}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="mt-6 text-sm text-muted">
          Showing <span className="font-medium text-heading">{filteredVehicles.length}</span> vehicles
        </p>

        {/* Vehicle Grid */}
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} {...vehicle} />
          ))}
        </div>

        {filteredVehicles.length === 0 && (
          <div className="text-center py-16">
            <p className="text-lg font-medium text-heading">No vehicles found</p>
            <p className="mt-2 text-sm text-muted">Try adjusting your filters or search term</p>
            <Button
              onClick={() => { setSearch(""); setCategory("All"); setLocation("All Locations"); }}
              variant="outline"
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
