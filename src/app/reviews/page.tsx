"use client";

import { useState } from "react";
import { Star, ThumbsUp, MessageCircle, Filter } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { RatingStars } from "@/components/ui/rating-stars";
import { cn } from "@/lib/utils";

const reviews = [
  { id: "1", author: "John D.", avatar: "JD", vehicle: "Toyota RAV4 2024", company: "Rwanda Car Rentals", rating: 5, date: "Mar 10, 2025", comment: "Excellent vehicle and amazing service! The RAV4 handled the roads to Volcanoes National Park perfectly. Highly recommend for anyone planning a gorilla trekking trip.", helpful: 12, images: ["https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=200&q=80"] },
  { id: "2", author: "Sarah K.", avatar: "SK", vehicle: "Land Rover Defender", company: "Safari Adventures", rating: 5, date: "Mar 5, 2025", comment: "The Defender was perfect for our Akagera safari. Spacious, comfortable, and the driver was incredibly knowledgeable about wildlife spots.", helpful: 8 },
  { id: "3", author: "Pierre N.", avatar: "PN", vehicle: "Toyota Hilux", company: "Kigali Tours", rating: 4, date: "Feb 28, 2025", comment: "Great truck for exploring Rwanda's countryside. Only minor issue was the AC being slightly slow to cool down, but overall a fantastic experience.", helpful: 5 },
  { id: "4", author: "Emma H.", avatar: "EH", vehicle: "Toyota Prado 2024", company: "Rwanda Car Rentals", rating: 5, date: "Feb 20, 2025", comment: "Best car rental experience in Rwanda! The booking process was seamless, the vehicle was immaculate, and the pickup/dropoff was hassle-free.", helpful: 15 },
  { id: "5", author: "David U.", avatar: "DU", vehicle: "Mercedes-Benz V-Class", company: "Kigali Premium Cars", rating: 4, date: "Feb 15, 2025", comment: "Luxurious van for our group trip. Very comfortable for long drives. The price was reasonable for the quality of service.", helpful: 3 },
];

export default function ReviewsPage() {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? reviews : reviews.filter((r) => r.rating === parseInt(filter));

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Reviews" }]} />

        <div className="mt-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-heading">Reviews</h1>
          <p className="text-sm text-muted">{reviews.length} reviews</p>
        </div>

        {/* Rating Summary */}
        <div className="mt-6 bg-card rounded-[16px] border border-gray-100 shadow-sm p-6 flex items-center gap-6">
          <div className="text-center">
            <p className="text-4xl font-bold text-heading">4.7</p>
            <RatingStars rating={4.7} size="sm" />
            <p className="text-xs text-muted mt-1">{reviews.length} reviews</p>
          </div>
          <div className="flex-1 space-y-1">
            {[5, 4, 3, 2, 1].map((s) => {
              const count = reviews.filter((r) => r.rating === s).length;
              const pct = (count / reviews.length) * 100;
              return (
                <div key={s} className="flex items-center gap-2 text-xs">
                  <span className="w-3 text-muted">{s}</span>
                  <Star className="w-3 h-3 fill-warning text-warning" />
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-warning rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="w-6 text-right text-muted">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filters */}
        <div className="mt-4 flex gap-2">
          {["all", "5", "4", "3"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                filter === f ? "bg-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              {f === "all" ? "All" : `${f} stars`}
            </button>
          ))}
        </div>

        {/* Reviews */}
        <div className="mt-6 space-y-4">
          {filtered.map((r) => (
            <div key={r.id} className="bg-card rounded-[16px] border border-gray-100 shadow-sm p-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary shrink-0">
                  {r.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-heading">{r.author}</p>
                    <RatingStars rating={r.rating} size="sm" />
                    <span className="text-xs text-muted ml-auto">{r.date}</span>
                  </div>
                  <p className="text-xs text-muted mt-0.5">{r.vehicle} · {r.company}</p>
                  <p className="text-sm text-body mt-2 leading-relaxed">{r.comment}</p>
                  {r.images && (
                    <div className="flex gap-2 mt-3">
                      {r.images.map((img, i) => (
                        <img key={i} src={img} alt="" className="w-16 h-16 rounded-[8px] object-cover" />
                      ))}
                    </div>
                  )}
                  <div className="flex items-center gap-4 mt-3">
                    <button className="flex items-center gap-1 text-xs text-muted hover:text-primary">
                      <ThumbsUp className="w-3 h-3" />
                      Helpful ({r.helpful})
                    </button>
                    <button className="flex items-center gap-1 text-xs text-muted hover:text-primary">
                      <MessageCircle className="w-3 h-3" />
                      Reply
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
