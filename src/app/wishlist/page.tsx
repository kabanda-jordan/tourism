"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart, Trash2, Car } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const wishlistItems = [
  { id: "1", name: "Toyota RAV4 2024", category: "SUV", price: 65000, rating: 4.8, reviews: 24, company: "Rwanda Car Rentals", image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&q=80" },
  { id: "2", name: "Land Rover Defender", category: "SUV", price: 120000, rating: 4.9, reviews: 18, company: "Safari Adventures", image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&q=80" },
  { id: "3", name: "Mercedes-Benz V-Class", category: "Van", price: 85000, rating: 4.7, reviews: 12, company: "Kigali Premium Cars", image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=400&q=80" },
];

export default function WishlistPage() {
  const [items, setItems] = useState(wishlistItems);
  const removeItem = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Wishlist" }]} />

        <div className="mt-4 flex items-center gap-2">
          <Heart className="w-6 h-6 text-error fill-error" />
          <h1 className="text-2xl font-bold text-heading">My Wishlist</h1>
          <span className="text-sm text-muted">({items.length} vehicles)</span>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div key={item.id} className="bg-card rounded-[16px] border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative">
                <img src={item.image} alt={item.name} className="w-full h-44 object-cover" />
                <button
                  onClick={() => removeItem(item.id)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center hover:bg-error/10 transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-error" />
                </button>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-heading">{item.name}</h3>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{item.category}</span>
                </div>
                <p className="text-xs text-muted mt-1">{item.company}</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs text-warning font-medium">{item.rating}</span>
                  <span className="text-xs text-muted">({item.reviews} reviews)</span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-primary font-bold">{item.price.toLocaleString()} RWF<span className="text-xs font-normal text-muted">/day</span></p>
                  <Link href={`/vehicles/${item.id}`}>
                    <Button size="sm">Book Now</Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {items.length === 0 && (
          <div className="mt-12 text-center">
            <Heart className="w-12 h-12 text-gray-300 mx-auto" />
            <h3 className="mt-4 text-lg font-semibold text-heading">Your wishlist is empty</h3>
            <p className="mt-1 text-sm text-muted">Browse vehicles and save your favorites</p>
            <Link href="/vehicles">
              <Button className="mt-4">
                <Car className="w-4 h-4" />
                Browse Vehicles
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
