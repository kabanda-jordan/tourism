"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  SlidersHorizontal,
  Grid3X3,
  List,
  Map,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { VehicleCard } from "@/components/composites/vehicle-card";
import { Pagination } from "@/components/ui/pagination";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Modal } from "@/components/ui/modal";
import { cn } from "@/lib/utils";

const mockVehicles = [
  {
    id: "1",
    title: "Toyota Land Cruiser V8",
    images: ["/images/vehicles/land-cruiser-v8.jpg"],
    category: "suv",
    transmission: "automatic",
    seats: 7,
    fuelType: "diesel",
    pricePerDay: 85000,
    location: "Kigali",
    rating: 4.9,
    totalReviews: 127,
    isFeatured: true,
  },
  {
    id: "2",
    title: "Mercedes-Benz GLC 300",
    images: ["/images/vehicles/mercedes-glc.jpg"],
    category: "luxury",
    transmission: "automatic",
    seats: 5,
    fuelType: "petrol",
    pricePerDay: 120000,
    location: "Kigali",
    rating: 4.8,
    totalReviews: 89,
    isFeatured: true,
  },
  {
    id: "3",
    title: "Toyota Hiace Commuter",
    images: ["/images/vehicles/hiace-commuter.jpg"],
    category: "van",
    transmission: "manual",
    seats: 14,
    fuelType: "diesel",
    pricePerDay: 65000,
    location: "Musanze",
    rating: 4.7,
    totalReviews: 54,
  },
  {
    id: "4",
    title: "Subaru Forester",
    images: ["/images/vehicles/subaru-forester.jpg"],
    category: "suv",
    transmission: "automatic",
    seats: 5,
    fuelType: "petrol",
    pricePerDay: 55000,
    location: "Kigali",
    rating: 4.6,
    totalReviews: 42,
  },
  {
    id: "5",
    title: "Nissan Patrol Safari",
    images: ["/images/vehicles/coaster-bus.jpg"],
    category: "suv",
    transmission: "automatic",
    seats: 7,
    fuelType: "diesel",
    pricePerDay: 95000,
    location: "Akagera",
    rating: 4.8,
    totalReviews: 67,
    isFeatured: true,
  },
  {
    id: "6",
    title: "Toyota RAV4",
    images: ["/images/vehicles/corolla.jpg"],
    category: "suv",
    transmission: "automatic",
    seats: 5,
    fuelType: "petrol",
    pricePerDay: 45000,
    location: "Rubavu",
    rating: 4.5,
    totalReviews: 31,
  },
  {
    id: "7",
    title: "Range Rover Sport",
    images: ["/images/vehicles/range-rover-sport.jpg"],
    category: "luxury",
    transmission: "automatic",
    seats: 5,
    fuelType: "diesel",
    pricePerDay: 180000,
    location: "Kigali",
    rating: 4.9,
    totalReviews: 63,
    isFeatured: true,
  },
  {
    id: "8",
    title: "Toyota Corolla",
    images: ["/images/vehicles/defender.jpg"],
    category: "sedan",
    transmission: "automatic",
    seats: 5,
    fuelType: "petrol",
    pricePerDay: 35000,
    location: "Kigali",
    rating: 4.5,
    totalReviews: 98,
  },
  {
    id: "9",
    title: "Land Rover Defender",
    images: ["https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80"],
    category: "suv",
    transmission: "manual",
    seats: 7,
    fuelType: "diesel",
    pricePerDay: 95000,
    location: "Rubavu",
    rating: 4.8,
    totalReviews: 65,
    isFeatured: true,
  },
  {
    id: "10",
    title: "Toyota Coaster Bus",
    images: ["https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80"],
    category: "bus",
    transmission: "manual",
    seats: 30,
    fuelType: "diesel",
    pricePerDay: 120000,
    location: "Kigali",
    rating: 4.5,
    totalReviews: 31,
  },
  {
    id: "11",
    title: "Bajaj Boxer Motorcycle",
    images: ["https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&q=80"],
    category: "motorcycle",
    transmission: "manual",
    seats: 2,
    fuelType: "petrol",
    pricePerDay: 12000,
    location: "Kigali",
    rating: 4.2,
    totalReviews: 78,
  },
  {
    id: "12",
    title: "Honda Civic",
    images: ["https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&q=80"],
    category: "sedan",
    transmission: "manual",
    seats: 5,
    fuelType: "petrol",
    pricePerDay: 30000,
    location: "Huye",
    rating: 4.4,
    totalReviews: 56,
  },
];

const sortOptions = [
  { value: "recommended", label: "Recommended" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "reviews", label: "Most Reviews" },
];

const categoryFilters = [
  { value: "sedan", label: "Sedan" },
  { value: "suv", label: "SUV" },
  { value: "van", label: "Van" },
  { value: "bus", label: "Bus" },
  { value: "luxury", label: "Luxury" },
  { value: "motorcycle", label: "Motorcycle" },
];

const transmissionFilters = [
  { value: "automatic", label: "Automatic" },
  { value: "manual", label: "Manual" },
];

const fuelFilters = [
  { value: "petrol", label: "Petrol" },
  { value: "diesel", label: "Diesel" },
  { value: "electric", label: "Electric" },
  { value: "hybrid", label: "Hybrid" },
];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("recommended");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTransmissions, setSelectedTransmissions] = useState<string[]>([]);
  const [selectedFuels, setSelectedFuels] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });

  useEffect(() => {
    const cat = searchParams.get("category");
    const loc = searchParams.get("location");
    const cats: string[] = [];
    if (cat) cats.push(cat.toLowerCase());
    if (loc) {
      const filtered = mockVehicles.filter((v) => v.location.toLowerCase() === loc.toLowerCase());
      if (filtered.length > 0) {
        const uniqueCats = [...new Set(filtered.map((v) => v.category))];
        cats.push(...uniqueCats);
      }
    }
    if (cats.length) setSelectedCategories([...new Set(cats)]);
  }, [searchParams]);

  const toggleFilter = (value: string, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const filteredVehicles = mockVehicles
    .filter((v) => {
      if (selectedCategories.length && !selectedCategories.includes(v.category)) return false;
      if (selectedTransmissions.length && !selectedTransmissions.includes(v.transmission)) return false;
      if (selectedFuels.length && !selectedFuels.includes(v.fuelType)) return false;
      if (priceRange.min && v.pricePerDay < Number(priceRange.min)) return false;
      if (priceRange.max && v.pricePerDay > Number(priceRange.max)) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low": return a.pricePerDay - b.pricePerDay;
        case "price-high": return b.pricePerDay - a.pricePerDay;
        case "rating": return b.rating - a.rating;
        case "reviews": return b.totalReviews - a.totalReviews;
        default: return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      }
    });

  const activeFilterCount =
    selectedCategories.length +
    selectedTransmissions.length +
    selectedFuels.length +
    (priceRange.min ? 1 : 0) +
    (priceRange.max ? 1 : 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Search Vehicles" }]} />

          <div className="flex items-center justify-between mt-4">
            <div>
              <h1 className="text-2xl font-bold text-heading">
                Available Vehicles
              </h1>
              <p className="text-sm text-muted mt-1">
                {filteredVehicles.length} vehicles found in Rwanda
              </p>
            </div>

            <div className="flex items-center gap-2">
              {/* Sort */}
              <div className="hidden sm:block">
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  options={sortOptions}
                  className="w-48 h-10 text-sm"
                />
              </div>

              {/* View Toggle */}
              <div className="flex bg-gray-100 rounded-[10px] p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={cn(
                    "p-2 rounded-[8px] transition-colors",
                    viewMode === "grid"
                      ? "bg-white shadow-sm text-primary"
                      : "text-muted"
                  )}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={cn(
                    "p-2 rounded-[8px] transition-colors",
                    viewMode === "list"
                      ? "bg-white shadow-sm text-primary"
                      : "text-muted"
                  )}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Map Toggle */}
              <Button variant="outline" size="sm" className="hidden md:flex">
                <Map className="w-4 h-4" />
                Map
              </Button>

              {/* Mobile Filter Toggle */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(true)}
                className="md:hidden"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 text-xs bg-primary text-white rounded-full">
                    {activeFilterCount}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden md:block w-64 shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Category */}
              <div>
                <h3 className="text-sm font-semibold text-heading mb-3">
                  Vehicle Type
                </h3>
                <div className="space-y-2">
                  {categoryFilters.map((f) => (
                    <label key={f.value} className="flex items-center gap-2 text-sm text-body cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(f.value)}
                        onChange={() => toggleFilter(f.value, setSelectedCategories)}
                        className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      {f.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Transmission */}
              <div>
                <h3 className="text-sm font-semibold text-heading mb-3">
                  Transmission
                </h3>
                <div className="space-y-2">
                  {transmissionFilters.map((f) => (
                    <label key={f.value} className="flex items-center gap-2 text-sm text-body cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedTransmissions.includes(f.value)}
                        onChange={() => toggleFilter(f.value, setSelectedTransmissions)}
                        className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      {f.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Fuel Type */}
              <div>
                <h3 className="text-sm font-semibold text-heading mb-3">
                  Fuel Type
                </h3>
                <div className="space-y-2">
                  {fuelFilters.map((f) => (
                    <label key={f.value} className="flex items-center gap-2 text-sm text-body cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedFuels.includes(f.value)}
                        onChange={() => toggleFilter(f.value, setSelectedFuels)}
                        className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      {f.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="text-sm font-semibold text-heading mb-3">
                  Price per Day (RWF)
                </h3>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                    className="w-full h-9 px-3 text-sm border border-gray-200 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  <span className="text-muted">{"\u2014"}</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                    className="w-full h-9 px-3 text-sm border border-gray-200 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>

              {/* Clear */}
              {activeFilterCount > 0 && (
                <button
                  onClick={() => {
                    setSelectedCategories([]);
                    setSelectedTransmissions([]);
                    setSelectedFuels([]);
                    setPriceRange({ min: "", max: "" });
                  }}
                  className="text-sm text-primary hover:text-primary-dark transition-colors"
                >
                  Clear all filters
                </button>
              )}
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1">
            {/* Active filter badges */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {[...selectedCategories, ...selectedTransmissions, ...selectedFuels].map(
                  (f) => (
                    <span
                      key={f}
                      className="inline-flex items-center gap-1 px-3 py-1 text-xs bg-primary/10 text-primary rounded-full"
                    >
                      {f}
                      <button onClick={() => {
                        setSelectedCategories((p) => p.filter((v) => v !== f));
                        setSelectedTransmissions((p) => p.filter((v) => v !== f));
                        setSelectedFuels((p) => p.filter((v) => v !== f));
                      }}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )
                )}
              </div>
            )}

            <div
              className={cn(
                viewMode === "grid"
                  ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                  : "space-y-4"
              )}
            >
              {filteredVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} {...vehicle} />
              ))}
            </div>

            {filteredVehicles.length === 0 && (
              <div className="text-center py-16">
                <p className="text-lg font-medium text-heading">No vehicles found</p>
                <p className="mt-2 text-sm text-muted">Try adjusting your filters</p>
                <button
                  onClick={() => {
                    setSelectedCategories([]);
                    setSelectedTransmissions([]);
                    setSelectedFuels([]);
                    setPriceRange({ min: "", max: "" });
                  }}
                  className="mt-4 text-sm text-primary hover:text-primary-dark"
                >
                  Clear all filters
                </button>
              </div>
            )}

            <Pagination
              currentPage={currentPage}
              totalPages={5}
              onPageChange={setCurrentPage}
              className="mt-8"
            />
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      <Modal
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        title="Filters"
        size="sm"
      >
        <div className="space-y-6 max-h-[60vh] overflow-y-auto">
          <div>
            <h3 className="text-sm font-semibold text-heading mb-3">Vehicle Type</h3>
            <div className="space-y-2">
              {categoryFilters.map((f) => (
                <label key={f.value} className="flex items-center gap-2 text-sm text-body cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(f.value)}
                    onChange={() => toggleFilter(f.value, setSelectedCategories)}
                    className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  {f.label}
                </label>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-heading mb-3">Transmission</h3>
            <div className="space-y-2">
              {transmissionFilters.map((f) => (
                <label key={f.value} className="flex items-center gap-2 text-sm text-body cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedTransmissions.includes(f.value)}
                    onChange={() => toggleFilter(f.value, setSelectedTransmissions)}
                    className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  {f.label}
                </label>
              ))}
            </div>
          </div>
          <Button fullWidth onClick={() => setShowFilters(false)}>
            Show Results
          </Button>
        </div>
      </Modal>
    </div>
  );
}
