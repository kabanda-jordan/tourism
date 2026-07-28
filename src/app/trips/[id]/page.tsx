"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Calendar, MapPin, Clock, Car, CreditCard, ArrowLeft, MessageCircle, Download, Star } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const tripData: Record<string, {
  vehicle: string;
  dates: string;
  days: number;
  status: string;
  pickup: string;
  dropoff: string;
  pickupTime: string;
  dropoffTime: string;
  total: number;
  image: string;
  extras: string[];
}> = {
  "RW-A1B2C3": {
    vehicle: "Toyota RAV4 2024",
    dates: "Mar 15 - Mar 20, 2025",
    days: 5,
    status: "confirmed",
    pickup: "Kigali City Center",
    dropoff: "Kigali International Airport",
    pickupTime: "10:00 AM",
    dropoffTime: "2:00 PM",
    total: 325000,
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80",
    extras: ["Comprehensive Insurance", "GPS Navigation"],
  },
};

export default function TripDetailPage() {
  const params = useParams();
  const tripId = params.id as string;
  const trip = tripData[tripId] || {
    vehicle: "Vehicle",
    dates: "Dates TBD",
    days: 1,
    status: "upcoming",
    pickup: "Kigali",
    dropoff: "Kigali",
    pickupTime: "10:00 AM",
    dropoffTime: "10:00 AM",
    total: 0,
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80",
    extras: [] as string[],
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "My Trips", href: "/trips" },
            { label: tripId },
          ]}
        />

        <div className="mt-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-heading">Trip Details</h1>
          <span className={`text-sm px-3 py-1 rounded-full font-medium ${
            trip.status === "confirmed" ? "bg-success/10 text-success" : "bg-gray-100 text-gray-500"
          }`}>
            {trip.status}
          </span>
        </div>

        {/* Vehicle */}
        <div className="mt-6 bg-card rounded-[16px] border border-gray-100 shadow-sm overflow-hidden">
          <img src={trip.image} alt={trip.vehicle} className="w-full h-48 object-cover" />
          <div className="p-6">
            <h2 className="text-xl font-semibold text-heading">{trip.vehicle}</h2>
            <p className="text-sm text-muted mt-1 font-mono">{tripId}</p>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-xs text-muted">Dates</p>
                  <p className="text-sm font-medium text-heading">{trip.dates}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-xs text-muted">Duration</p>
                  <p className="text-sm font-medium text-heading">{trip.days} days</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-xs text-muted">Pickup</p>
                  <p className="text-sm font-medium text-heading">{trip.pickup} at {trip.pickupTime}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-secondary" />
                <div>
                  <p className="text-xs text-muted">Dropoff</p>
                  <p className="text-sm font-medium text-heading">{trip.dropoff} at {trip.dropoffTime}</p>
                </div>
              </div>
            </div>

            {trip.extras.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm font-medium text-heading mb-2">Extras</p>
                <div className="flex flex-wrap gap-2">
                  {trip.extras.map((e) => (
                    <span key={e} className="text-xs bg-primary/5 text-primary px-2 py-1 rounded-full">{e}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Payment Summary */}
        <div className="mt-6 bg-card rounded-[16px] border border-gray-100 shadow-sm p-6">
          <h3 className="font-semibold text-heading mb-3 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-primary" />
            Payment Summary
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Vehicle ({trip.days} days)</span>
              <span className="text-heading">{(trip.total * 0.85).toLocaleString()} RWF</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Extras & fees</span>
              <span className="text-heading">{(trip.total * 0.15).toLocaleString()} RWF</span>
            </div>
            <div className="border-t border-gray-100 pt-2 flex justify-between font-semibold">
              <span className="text-heading">Total</span>
              <span className="text-primary">{trip.total.toLocaleString()} RWF</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          {trip.status === "confirmed" && (
            <>
              <Link href="/messages">
                <Button variant="outline" fullWidth>
                  <MessageCircle className="w-4 h-4" />
                  Contact Company
                </Button>
              </Link>
              <Button variant="outline" fullWidth>
                <Download className="w-4 h-4" />
                Download Receipt
              </Button>
            </>
          )}
          {trip.status === "completed" && (
            <div className="col-span-2">
              <Button fullWidth>
                <Star className="w-4 h-4" />
                Leave a Review
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
