"use client";

import Link from "next/link";
import { Compass, MapPin, Calendar, Star, Heart, Car, Mountain, Coffee, ArrowRight, Sparkles } from "lucide-react";

const stats = [
  { label: "Adventures", value: "4", icon: Compass, accent: "#F59E0B" },
  { label: "Countries", value: "3", icon: MapPin, accent: "#10B981" },
  { label: "Wishlist", value: "5", icon: Heart, accent: "#EF4444" },
  { label: "Reviews", value: "2", icon: Star, accent: "#8B5CF6" },
];

const upcomingTrips = [
  { id: "RW-A1B2C3", vehicle: "Toyota RAV4", dates: "Mar 15 - 20", status: "confirmed", total: 325000, image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=200&q=80" },
  { id: "RW-D4E5F6", vehicle: "Land Rover Defender", dates: "Apr 2 - 5", status: "pending", total: 420000, image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=200&q=80" },
];

const destinations = [
  { name: "Volcanoes National Park", desc: "Gorilla trekking", color: "#059669", icon: Mountain },
  { name: "Lake Kivu", desc: "Beach & kayaking", color: "#0EA5E9", icon: Coffee },
  { name: "Akagera National Park", desc: "Safari drive", color: "#D97706", icon: Compass },
];

export default function TouristDashboardPage() {
  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #FFFBEB 0%, #FFFFFF 100%)" }}>
      {/* Hero */}
      <div className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)" }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 25px 25px, white 2px, transparent 0)", backgroundSize: "50px 50px" }} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white/80">Good morning, John!</p>
              <h1 className="text-3xl font-bold text-white mt-1">Ready for your next adventure?</h1>
              <p className="text-white/70 mt-1 text-sm">Explore Rwanda with confidence</p>
            </div>
            <Link href="/vehicles">
              <button className="flex items-center gap-2 bg-white text-amber-700 px-5 py-2.5 rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
                <Sparkles className="w-4 h-4" />
                Book a Vehicle
              </button>
            </Link>
          </div>

          {/* Quick Stats in Hero */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {stats.map((s) => (
              <div key={s.label} className="bg-white/15 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/20">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${s.accent}20` }}>
                    <s.icon className="w-4 h-4" style={{ color: s.accent }} />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-white">{s.value}</p>
                    <p className="text-xs text-white/70">{s.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 -mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Trips — span 2 cols */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Trips */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold text-gray-800">Your Trips</h2>
                <Link href="/trips" className="text-sm font-medium text-amber-600 hover:text-amber-700 flex items-center gap-1">
                  View all <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              <div className="space-y-3">
                {upcomingTrips.map((t) => (
                  <Link key={t.id} href={`/trips/${t.id}`}>
                    <div className="bg-white rounded-2xl border border-amber-100 overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-0.5 flex">
                      <div className="w-28 shrink-0 bg-gray-100 overflow-hidden">
                        <img src={t.image} alt={t.vehicle} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 px-4 py-3 flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-gray-800">{t.vehicle}</p>
                            <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                              t.status === "confirmed"
                                ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                                : "bg-amber-50 text-amber-600 border border-amber-200"
                            }`}>
                              {t.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 mt-0.5 flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> {t.dates}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-amber-600">{t.total.toLocaleString()} <span className="text-xs">RWF</span></p>
                          <p className="text-[11px] text-gray-400">Total</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Past Trip Card */}
            <div className="bg-white/60 rounded-2xl border border-gray-100 p-4 flex items-center justify-between opacity-70">
              <div>
                <p className="font-semibold text-gray-700">Toyota Hilux 2023</p>
                <p className="text-sm text-gray-400">Jan 10 - Jan 15</p>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-3.5 h-3.5 ${i < 5 ? "fill-amber-400 text-amber-400" : "text-gray-200"}`} />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Explore Rwanda */}
            <div className="bg-white rounded-2xl border border-amber-100 shadow-sm p-5">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <Compass className="w-4 h-4 text-amber-500" />
                Explore Rwanda
              </h3>
              <div className="mt-3 space-y-2">
                {destinations.map((d) => (
                  <div key={d.name} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-amber-50 transition-colors cursor-pointer">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${d.color}15` }}>
                      <d.icon className="w-4 h-4" style={{ color: d.color }} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">{d.name}</p>
                      <p className="text-xs text-gray-400">{d.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-2xl border border-amber-100 shadow-sm p-5">
              <h3 className="font-bold text-gray-800 mb-3">Quick Links</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Vehicles", href: "/vehicles", icon: Car, color: "#F59E0B" },
                  { label: "Trips", href: "/trips", icon: MapPin, color: "#10B981" },
                  { label: "Wishlist", href: "/wishlist", icon: Heart, color: "#EF4444" },
                  { label: "Profile", href: "/profile", icon: Star, color: "#8B5CF6" },
                ].map((l) => (
                  <Link key={l.href} href={l.href}>
                    <div className="flex flex-col items-center gap-1 p-3 rounded-xl hover:bg-amber-50 transition-colors">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${l.color}15` }}>
                        <l.icon className="w-4 h-4" style={{ color: l.color }} />
                      </div>
                      <p className="text-xs font-medium text-gray-600">{l.label}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
