"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { MapPin, Star, ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ImageGallery } from "@/components/composites/image-gallery";
import { VehicleCard } from "@/components/composites/vehicle-card";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

const destinationData: Record<string, {
  name: string;
  description: string;
  images: string[];
  activities: string[];
  region: string;
}> = {
  volcanoes: {
    name: "Volcanoes National Park",
    description: "Home to over 300 mountain gorillas, Volcanoes National Park is one of the most important wildlife conservation areas in the world. The park spans across the Virunga mountains and offers unforgettable gorilla trekking experiences, golden monkey tracking, and breathtaking hikes through bamboo forests.",
    images: [
      "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1200&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
    ],
    activities: ["Gorilla Trekking", "Golden Monkey Tracking", "Hiking", "Bird Watching", "Dian Fossey Tomb Visit", "Community Tours"],
    region: "Northern Province",
  },
};

const defaultDestination = {
  name: "Destination",
  description: "Discover the beauty of this incredible Rwandan destination.",
  images: ["https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1200&q=80"],
  activities: ["Sightseeing", "Photography", "Nature Walks"],
  region: "Rwanda",
};

export default function DestinationDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const dest = destinationData[slug] || { ...defaultDestination, name: slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()) };

  return (
    <div className="min-h-screen bg-background">
      {/* Gallery */}
      <ImageGallery images={dest.images} alt={dest.name} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Destinations", href: "/destinations" },
            { label: dest.name },
          ]}
        />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold text-heading">{dest.name}</h1>
              <Badge variant="primary">{dest.region}</Badge>
            </div>

            <p className="text-body leading-relaxed">{dest.description}</p>

            <div>
              <h2 className="text-lg font-semibold text-heading mb-3">Activities</h2>
              <div className="grid grid-cols-2 gap-2">
                {dest.activities.map((a) => (
                  <div key={a} className="flex items-center gap-2 text-sm text-body p-2 bg-gray-50 rounded-[10px]">
                    <Check className="w-4 h-4 text-success shrink-0" />
                    {a}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-card rounded-[16px] border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-heading mb-3">Nearby Vehicles</h3>
              <p className="text-sm text-muted mb-4">Rent a vehicle to explore this destination</p>
              <Link href={`/vehicles?location=${slug}`}>
                <Button fullWidth>Browse Vehicles</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
