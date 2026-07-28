"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Users, Fuel, Settings2, Star, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RatingStars } from "@/components/ui/rating-stars";
import { formatPrice } from "@/lib/utils";

interface VehicleCardProps {
  id: string;
  title: string;
  images: string[];
  category: string;
  transmission: string;
  seats: number;
  fuelType: string;
  pricePerDay: number;
  location: string;
  rating: number;
  totalReviews: number;
  isFeatured?: boolean;
  isAvailable?: boolean;
  className?: string;
}

export function VehicleCard({
  id,
  title,
  images,
  category,
  transmission,
  seats,
  fuelType,
  pricePerDay,
  location,
  rating,
  totalReviews,
  isFeatured = false,
  isAvailable = true,
  className,
}: VehicleCardProps) {
  return (
    <div
      className={`bg-card rounded-[16px] border border-gray-100 shadow-sm overflow-hidden transition-shadow duration-200 hover:shadow-md group ${className}`}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Link href={`/vehicles/${id}`}>
          <img
            src={images[0] || "/placeholder-vehicle.jpg"}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Favorite button */}
        <button className="absolute top-3 right-3 p-2 bg-card/80 backdrop-blur-sm rounded-full hover:bg-card transition-colors">
          <Heart className="w-4 h-4 text-body" />
        </button>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {isFeatured && <Badge variant="secondary">Featured</Badge>}
          {!isAvailable && <Badge variant="danger">Unavailable</Badge>}
        </div>

        {/* Price overlay */}
        <div className="absolute bottom-3 right-3 bg-card/90 backdrop-blur-sm rounded-[10px] px-3 py-1.5">
          <span className="text-lg font-bold text-heading font-mono">
            {formatPrice(pricePerDay)}
          </span>
          <span className="text-xs text-muted">/day</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <Link href={`/vehicles/${id}`}>
          <h3 className="text-base font-semibold text-heading hover:text-primary transition-colors line-clamp-1">
            {title}
          </h3>
        </Link>

        <div className="flex items-center gap-1.5 mt-1.5 text-sm text-muted">
          <MapPin className="w-3.5 h-3.5" />
          <span className="truncate">{location}</span>
        </div>

        {/* Specs */}
        <div className="flex items-center gap-3 mt-3 text-xs text-muted">
          <span className="flex items-center gap-1">
            <Settings2 className="w-3.5 h-3.5" />
            {transmission}
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            {seats} seats
          </span>
          <span className="flex items-center gap-1">
            <Fuel className="w-3.5 h-3.5" />
            {fuelType}
          </span>
        </div>

        {/* Rating & CTA */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1.5">
            <RatingStars rating={rating} size="sm" />
            <span className="text-xs text-muted">
              ({totalReviews})
            </span>
          </div>
          <Link href={`/vehicles/${id}`}>
            <Button size="sm">Book Now</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
