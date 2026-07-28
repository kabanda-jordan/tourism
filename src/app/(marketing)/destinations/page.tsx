"use client";

import { DestinationCard } from "@/components/composites/destination-card";
import { SearchBox } from "@/components/composites/search-box";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

const destinations = [
  { id: "1", name: "Volcanoes National Park", slug: "volcanoes", description: "Home to mountain gorillas and golden monkeys. Experience unforgettable gorilla trekking in the Virunga mountains.", image: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&q=80", activities: ["Gorilla Trekking", "Golden Monkey Tracking", "Hiking", "Bird Watching"], featured: true },
  { id: "2", name: "Akagera National Park", slug: "akagera", description: "Rwanda's only savannah park with the Big Five. Spot lions, elephants, giraffes, and more on game drives.", image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80", activities: ["Game Drives", "Bird Watching", "Boat Safaris", "Camping"], featured: true },
  { id: "3", name: "Nyungwe Forest", slug: "nyungwe", description: "Ancient rainforest with chimpanzees, colobus monkeys, and Africa's highest canopy walk.", image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80", activities: ["Chimpanzee Tracking", "Canopy Walk", "Hiking", "Tea Tours"] },
  { id: "4", name: "Lake Kivu", slug: "lake-kivu", description: "Stunning lakeside drives and relaxing beach towns along the Congo-Nile Trail.", image: "https://images.unsplash.com/photo-1534759926189-ee5c5a3ddeee?w=800&q=80", activities: ["Beach", "Kayaking", "Congo-Nile Trail", "Fishing"], featured: true },
  { id: "5", name: "Kigali", slug: "kigali", description: "Rwanda's vibrant capital city. Visit the Genocide Memorial, local markets, and world-class restaurants.", image: "https://images.unsplash.com/photo-1580746738099-762e8ab1b1e7?w=800&q=80", activities: ["City Tours", "Genocide Memorial", "Markets", "Dining"] },
  { id: "6", name: "Musanze", slug: "musanze", description: "Gateway to Volcanoes National Park. Explore caves, markets, and adventure activities.", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80", activities: ["Cave Tours", "Mountain Biking", "Community Tours", "Dian Fossey Tomb"] },
  { id: "7", name: "Rubavu", slug: "rubavu", description: "Beautiful lakeside town on Lake Kivu. Perfect for relaxation and water sports.", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80", activities: ["Beach", "Swimming", "Water Sports", "Sunset Cruises"] },
];

export default function DestinationsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative h-64 bg-gradient-to-r from-primary to-primary-dark">
        <img
          src="https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1920&q=80"
          alt="Rwanda Destinations"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-3xl font-bold sm:text-4xl">
              Explore Rwanda
            </h1>
            <p className="mt-2 text-white/80">
              From gorilla trekking to savannah safaris
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Destinations" }]} />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
          {destinations.map((dest) => (
            <DestinationCard key={dest.id} {...dest} />
          ))}
        </div>
      </div>
    </div>
  );
}
