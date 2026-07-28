"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  MapPin,
  Users,
  Fuel,
  Settings2,
  Heart,
  Share2,
  Shield,
  Calendar,
  Check,
  Star,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { RatingStars } from "@/components/ui/rating-stars";
import { ImageGallery } from "@/components/composites/image-gallery";
import { ReviewCard } from "@/components/composites/review-card";
import { VehicleCard } from "@/components/composites/vehicle-card";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { formatPrice, formatDate } from "@/lib/utils";

const vehicleData: Record<string, {
  title: string;
  description: string;
  images: string[];
  category: string;
  transmission: string;
  seats: number;
  fuelType: string;
  pricePerDay: number;
  location: string;
  rating: number;
  totalReviews: number;
  features: string[];
  company: { name: string; verified: boolean; rating: number; vehicleCount: number };
}> = {
  "1": {
    title: "Toyota Land Cruiser V8",
    description: "The ultimate safari vehicle. Perfect for Rwanda's terrain with powerful 4WD capability. Spacious interior with air conditioning and comfortable seating for long drives to national parks.",
    images: [
      "https://images.unsplash.com/photo-1594611396050-13d7dc4bf0dc?w=1200&q=80",
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=800&q=80",
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
    ],
    category: "SUV",
    transmission: "Automatic",
    seats: 7,
    fuelType: "Diesel",
    pricePerDay: 85000,
    location: "Kigali, Rwanda",
    rating: 4.9,
    totalReviews: 127,
    features: ["4WD", "Air Conditioning", "Bluetooth", "Roof Rack", "USB Charging", "First Aid Kit", "GPS Navigation"],
    company: { name: "Rwanda Premium Cars", verified: true, rating: 4.8, vehicleCount: 24 },
  },
};

const defaultVehicle = vehicleData["1"];

const mockReviews = [
  {
    id: "1",
    userName: "Sarah Johnson",
    rating: 5,
    comment: "Perfect vehicle for our gorilla trekking trip! The Land Cruiser handled the mountain roads with ease. Very clean and well-maintained.",
    date: "2024-12-15",
  },
  {
    id: "2",
    userName: "Jean-Pierre Mugabo",
    rating: 5,
    comment: "Excellent service from start to finish. The vehicle was exactly as described and the pickup was smooth. Highly recommend!",
    date: "2024-11-28",
  },
  {
    id: "3",
    userName: "Emma Thompson",
    rating: 4,
    comment: "Great vehicle for our Akagera safari. Comfortable ride and good fuel economy. The company was very responsive.",
    date: "2024-11-10",
  },
];

export default function VehicleDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const vehicle = vehicleData[id] || defaultVehicle;
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Vehicles", href: "/vehicles" },
            { label: vehicle.title },
          ]}
        />

        {/* Back button */}
        <Link
          href="/vehicles"
          className="inline-flex items-center gap-1.5 mt-4 text-sm text-muted hover:text-heading transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to vehicles
        </Link>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Gallery */}
            <ImageGallery images={vehicle.images} alt={vehicle.title} />

            {/* Title + Actions */}
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-heading">
                    {vehicle.title}
                  </h1>
                  <Badge variant="primary">{vehicle.category}</Badge>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center gap-1.5 text-sm text-muted">
                    <MapPin className="w-4 h-4" />
                    {vehicle.location}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <RatingStars rating={vehicle.rating} size="sm" showValue />
                    <span className="text-xs text-muted">
                      ({vehicle.totalReviews} reviews)
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="p-2.5 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 ${isWishlisted ? "fill-error text-error" : "text-muted"}`}
                  />
                </button>
                <button className="p-2.5 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
                  <Share2 className="w-5 h-5 text-muted" />
                </button>
              </div>
            </div>

            {/* Specs */}
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-[12px]">
                <Settings2 className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-muted">Transmission</p>
                  <p className="text-sm font-medium text-heading">
                    {vehicle.transmission}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-[12px]">
                <Users className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-muted">Seats</p>
                  <p className="text-sm font-medium text-heading">
                    {vehicle.seats}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-[12px]">
                <Fuel className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-muted">Fuel</p>
                  <p className="text-sm font-medium text-heading">
                    {vehicle.fuelType}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-lg font-semibold text-heading">Description</h2>
              <p className="mt-2 text-sm text-body leading-relaxed">
                {vehicle.description}
              </p>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-lg font-semibold text-heading">Features</h2>
              <div className="grid grid-cols-2 gap-2 mt-3">
                {vehicle.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-sm text-body">
                    <Check className="w-4 h-4 text-success shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            {/* Company */}
            <div>
              <h2 className="text-lg font-semibold text-heading mb-3">
                Rental Company
              </h2>
              <Card className="p-4">
                <div className="flex items-center gap-4">
                  <Avatar name={vehicle.company.name} size="lg" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-heading">
                        {vehicle.company.name}
                      </h3>
                      {vehicle.company.verified && (
                        <Badge variant="success" size="sm">Verified</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-sm text-muted">
                      <RatingStars rating={vehicle.company.rating} size="sm" showValue />
                      <span>{vehicle.company.vehicleCount} vehicles</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Profile
                  </Button>
                </div>
              </Card>
            </div>

            {/* Reviews */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-heading">
                  Reviews ({vehicle.totalReviews})
                </h2>
                <RatingStars rating={vehicle.rating} size="md" showValue />
              </div>
              <div className="space-y-4">
                {mockReviews.map((review) => (
                  <ReviewCard key={review.id} {...review} />
                ))}
              </div>
              <Button variant="outline" className="mt-4" fullWidth>
                View All Reviews
              </Button>
            </div>
          </div>

          {/* Sidebar - Sticky Book Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="p-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-heading font-mono">
                    {formatPrice(vehicle.pricePerDay)}
                  </span>
                  <span className="text-sm text-muted">/day</span>
                </div>

                <div className="mt-4 space-y-3">
                  {/* Availability Calendar Placeholder */}
                  <div className="p-3 bg-gray-50 rounded-[12px]">
                    <div className="flex items-center gap-2 text-sm text-body mb-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span className="font-medium">Availability</span>
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {Array.from({ length: 28 }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-6 rounded text-[10px] flex items-center justify-center ${
                            i < 5 || (i > 10 && i < 15)
                              ? "bg-gray-200 text-muted"
                              : "bg-success/10 text-success"
                          }`}
                        >
                          {i + 1}
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link href={`/booking/${id}`}>
                    <Button fullWidth size="lg">
                      Book Now
                    </Button>
                  </Link>

                  <div className="flex items-center gap-2 text-xs text-muted justify-center">
                    <Shield className="w-3.5 h-3.5" />
                    Free cancellation up to 24 hours before pickup
                  </div>
                </div>

                {/* Price breakdown */}
                <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Daily rate</span>
                    <span className="text-body">{formatPrice(vehicle.pricePerDay)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Insurance</span>
                    <span className="text-body">{formatPrice(15000)}/day</span>
                  </div>
                  <div className="flex justify-between text-sm font-semibold pt-2 border-t border-gray-100">
                    <span className="text-heading">Estimated total</span>
                    <span className="text-heading">{formatPrice(vehicle.pricePerDay + 15000)}/day</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Related Vehicles */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-heading mb-6">
            Related Vehicles
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                id: "5",
                title: "Nissan Patrol Safari",
                images: ["https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80"],
                category: "suv",
                transmission: "automatic",
                seats: 7,
                fuelType: "diesel",
                pricePerDay: 95000,
                location: "Akagera",
                rating: 4.8,
                totalReviews: 67,
              },
              {
                id: "6",
                title: "Hyundai Tucson",
                images: ["https://images.unsplash.com/photo-1633789242441-8a4206346e76?w=800&q=80"],
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
                images: ["https://images.unsplash.com/photo-1519245659620-e859806a8d7b?w=800&q=80"],
                category: "luxury",
                transmission: "automatic",
                seats: 5,
                fuelType: "diesel",
                pricePerDay: 150000,
                location: "Kigali",
                rating: 4.9,
                totalReviews: 45,
              },
              {
                id: "8",
                title: "Toyota Prado",
                images: ["https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=800&q=80"],
                category: "suv",
                transmission: "automatic",
                seats: 7,
                fuelType: "diesel",
                pricePerDay: 70000,
                location: "Kigali",
                rating: 4.7,
                totalReviews: 93,
              },
            ].map((v) => (
              <VehicleCard key={v.id} {...v} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
