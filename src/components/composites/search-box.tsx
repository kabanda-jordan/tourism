"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";

interface SearchBoxProps {
  variant?: "hero" | "compact";
  className?: string;
}

export function SearchBox({ variant = "hero", className }: SearchBoxProps) {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (category) params.set("category", category);
    router.push(`/search?${params.toString()}`);
  };

  if (variant === "compact") {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="flex-1 flex items-center gap-2 px-4 h-11 bg-card border border-gray-200 rounded-[12px]">
          <Search className="w-4 h-4 text-muted shrink-0" />
          <input
            type="text"
            placeholder="Search vehicles..."
            className="flex-1 text-sm bg-transparent outline-none placeholder:text-muted"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
        <Button onClick={handleSearch} size="md">
          <Search className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <div
      className={`bg-card rounded-[20px] shadow-lg border border-gray-100 p-2 ${className}`}
    >
      <div className="flex flex-col md:flex-row gap-2">
        {/* Location */}
        <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-[14px] hover:bg-gray-50 transition-colors">
          <MapPin className="w-5 h-5 text-primary shrink-0" />
          <div className="flex-1">
            <label className="block text-xs font-medium text-muted">
              Location
            </label>
            <input
              type="text"
              placeholder="Where are you going?"
              className="w-full text-sm bg-transparent outline-none placeholder:text-muted text-heading"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>

        {/* Vehicle Type */}
        <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-[14px] hover:bg-gray-50 transition-colors border-t md:border-t-0 md:border-l border-gray-100">
          <Users className="w-5 h-5 text-primary shrink-0" />
          <div className="flex-1">
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              options={[
                { value: "", label: "All Types" },
                { value: "sedan", label: "Sedan" },
                { value: "suv", label: "SUV" },
                { value: "van", label: "Van" },
                { value: "bus", label: "Bus" },
                { value: "luxury", label: "Luxury" },
                { value: "motorcycle", label: "Motorcycle" },
              ]}
              className="border-0 bg-transparent h-auto p-0 text-sm focus:ring-0"
            />
          </div>
        </div>

        {/* Search button */}
        <div className="flex items-center">
          <Button onClick={handleSearch} size="lg" className="w-full md:w-auto">
            <Search className="w-4 h-4" />
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}
