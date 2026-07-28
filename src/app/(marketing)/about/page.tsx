"use client";

import Link from "next/link";
import { Shield, Mountain, TreePalm, Building2, MapPin, Car, Globe, Heart } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

const nationalParks = [
  { name: "Volcanoes National Park", description: "Home to mountain gorillas and the Virunga volcanoes.", icon: Mountain },
  { name: "Akagera National Park", description: "Rwanda's Big Five savannah park.", icon: TreePalm },
  { name: "Nyungwe Forest", description: "Ancient rainforest with chimpanzees.", icon: TreePalm },
];

const stats = [
  { value: "1,000+", label: "Mountain Gorillas" },
  { value: "10,000+", label: "Species Protected" },
  { value: "5", label: "Provinces" },
  { value: "33%", label: "Forested Land" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative h-80 bg-gradient-to-r from-primary to-primary-dark overflow-hidden">
        <img src="https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1920&q=80" alt="Rwanda" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 flex items-center justify-center text-center text-white">
          <div>
            <h1 className="text-4xl font-bold sm:text-5xl">The Land of a Thousand Hills</h1>
            <p className="mt-3 text-lg text-white/80 max-w-2xl mx-auto">Rwanda — where ancient forests meet modern cities, and wildlife thrives alongside innovation.</p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About Rwanda" }]} />

        {/* About Rwanda */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-heading">Discover Rwanda</h2>
            <p className="mt-4 text-body leading-relaxed">
              Rwanda is a landlocked country in East Africa known for its stunning landscapes, vibrant culture, and incredible wildlife. From the mist-covered Virunga mountains to the rolling green hills, Rwanda offers an unparalleled travel experience.
            </p>
            <p className="mt-4 text-body leading-relaxed">
              Known as the &ldquo;Land of a Thousand Hills&rdquo; for its beautiful hilly terrain, Rwanda has emerged as one of Africa&apos;s top tourist destinations. The country is home to roughly one-third of the world&apos;s remaining mountain gorillas, making it a must-visit for wildlife enthusiasts.
            </p>
            <p className="mt-4 text-body leading-relaxed">
              Beyond wildlife, Rwanda boasts a rich cultural heritage, world-class infrastructure, and a commitment to conservation that has made it one of the cleanest and safest countries in Africa.
            </p>
          </div>
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=800&q=80" alt="Rwanda Landscape" className="rounded-[16px] shadow-lg" />
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center p-6 bg-card rounded-[16px] border border-gray-100 shadow-sm">
              <p className="text-3xl font-bold text-primary">{s.value}</p>
              <p className="mt-1 text-sm text-muted">{s.label}</p>
            </div>
          ))}
        </div>

        {/* National Parks */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-heading text-center">National Parks</h2>
          <p className="mt-2 text-body text-center max-w-xl mx-auto">Rwanda is home to three incredible national parks, each offering unique wildlife experiences.</p>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {nationalParks.map((park) => (
              <div key={park.name} className="bg-card rounded-[16px] border border-gray-100 shadow-sm p-6 text-center">
                <div className="flex items-center justify-center w-14 h-14 mx-auto rounded-full bg-primary/10">
                  <park.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-heading">{park.name}</h3>
                <p className="mt-2 text-sm text-body">{park.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Culture */}
        <div className="mt-16 bg-card rounded-[24px] border border-gray-100 shadow-sm p-8 sm:p-12">
          <h2 className="text-2xl font-bold text-heading text-center">Rwandan Culture</h2>
          <p className="mt-4 text-body text-center max-w-2xl mx-auto">
            Rwanda&apos;s culture is rich and vibrant, with traditional dance (Intore), intricate basket weaving (Agaseke), and a deep respect for community (Umuganda). The country has three official languages: Kinyarwanda, French, and English.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-heading">Ready to Explore Rwanda?</h2>
          <p className="mt-2 text-body">Book your vehicle and start your adventure today.</p>
          <Link href="/vehicles" className="inline-flex mt-6 px-8 py-3 bg-primary text-white rounded-[16px] font-medium hover:bg-primary-dark transition-colors">
            Browse Vehicles
          </Link>
        </div>
      </div>
    </div>
  );
}
