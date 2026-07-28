"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Shield,
  Clock,
  MapPin,
  Users,
  Car,
  ArrowRight,
  Quote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchBox } from "@/components/composites/search-box";
import { VehicleCard } from "@/components/composites/vehicle-card";
import { DestinationCard } from "@/components/composites/destination-card";
import { CategoryCard } from "@/components/composites/category-card";
import { RatingStars } from "@/components/ui/rating-stars";

const heroSlides = [
  {
    image:
      "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1920&q=80",
    title: "Discover the Land of\na Thousand Hills",
    subtitle:
      "Premium vehicle hiring for your Rwanda safari adventure. Explore gorilla trekking, savannah safaris, and breathtaking landscapes.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1920&q=80",
    title: "Gorilla Trekking\nAwaits You",
    subtitle:
      "Book your vehicle and head to Volcanoes National Park for an unforgettable mountain gorilla experience.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1920&q=80",
    title: "Safari Adventures\nAcross Rwanda",
    subtitle:
      "From Akagera's lions and elephants to Nyungwe's chimpanzees — your wildlife journey starts here.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1534759926189-ee5c5a3ddeee?w=1920&q=80",
    title: "Explore Lake Kivu\n& Beyond",
    subtitle:
      "Scenic drives along Rwanda's great lakes. Rent the perfect vehicle for your road trip.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=1920&q=80",
    title: "Your Journey,\nYour Way",
    subtitle:
      "SUVs, sedans, luxury vehicles — choose the ride that matches your adventure style.",
  },
];

const featuredVehicles = [
  {
    id: "1",
    title: "Toyota Land Cruiser V8",
    images: [
      "https://images.unsplash.com/photo-1594611396050-13d7dc4bf0dc?w=800&q=80",
    ],
    category: "suv",
    transmission: "automatic",
    seats: 7,
    fuelType: "diesel",
    pricePerDay: 85000,
    location: "Kigali",
    rating: 4.9,
    totalReviews: 127,
    isFeatured: true,
  },
  {
    id: "2",
    title: "Mercedes-Benz GLC 300",
    images: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80",
    ],
    category: "luxury",
    transmission: "automatic",
    seats: 5,
    fuelType: "petrol",
    pricePerDay: 120000,
    location: "Kigali",
    rating: 4.8,
    totalReviews: 89,
    isFeatured: true,
  },
  {
    id: "3",
    title: "Toyota Hiace Commuter",
    images: [
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&q=80",
    ],
    category: "van",
    transmission: "manual",
    seats: 14,
    fuelType: "diesel",
    pricePerDay: 65000,
    location: "Musanze",
    rating: 4.7,
    totalReviews: 54,
  },
  {
    id: "4",
    title: "Subaru Forester",
    images: [
      "https://images.unsplash.com/photo-1568844293986-8d0400f4745b?w=800&q=80",
    ],
    category: "suv",
    transmission: "automatic",
    seats: 5,
    fuelType: "petrol",
    pricePerDay: 55000,
    location: "Kigali",
    rating: 4.6,
    totalReviews: 42,
  },
];

const popularDestinations = [
  {
    id: "1",
    name: "Volcanoes National Park",
    slug: "volcanoes",
    description:
      "Home to mountain gorillas and golden monkeys. Experience unforgettable gorilla trekking.",
    image:
      "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&q=80",
    activities: ["Gorilla Trekking", "Golden Monkey Tracking", "Hiking"],
    featured: true,
  },
  {
    id: "2",
    name: "Akagera National Park",
    slug: "akagera",
    description:
      "Rwanda's only savannah park. See lions, elephants, giraffes, and hippos.",
    image:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
    activities: ["Game Drives", "Bird Watching", "Boat Safaris"],
    featured: true,
  },
  {
    id: "3",
    name: "Nyungwe Forest",
    slug: "nyungwe",
    description:
      "Ancient rainforest with chimpanzees, colobus monkeys, and the famous canopy walk.",
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
    activities: ["Chimpanzee Tracking", "Canopy Walk", "Hiking"],
  },
  {
    id: "4",
    name: "Lake Kivu",
    slug: "lake-kivu",
    description:
      "Stunning lakeside drives and relaxing beach towns along the Congo-Nile Trail.",
    image:
      "https://images.unsplash.com/photo-1534759926189-ee5c5a3ddeee?w=800&q=80",
    activities: ["Beach", "Kayaking", "Congo-Nile Trail"],
  },
];

const categories = [
  { name: "SUV", slug: "suv", icon: "suv", count: 124 },
  { name: "Sedan", slug: "sedan", icon: "sedan", count: 89 },
  { name: "Van", slug: "van", icon: "van", count: 56 },
  { name: "Luxury", slug: "luxury", icon: "luxury", count: 34 },
  { name: "Bus", slug: "bus", icon: "bus", count: 28 },
  { name: "Motorcycle", slug: "motorcycle", icon: "motorcycle", count: 15 },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    avatar: "",
    rating: 5,
    comment:
      "Incredible experience! The Toyota Land Cruiser was perfect for our gorilla trekking trip. The vehicle was clean, well-maintained, and the booking process was seamless.",
    location: "New York, USA",
  },
  {
    name: "Jean-Pierre Mugabo",
    avatar: "",
    rating: 5,
    comment:
      "Best car rental service in Rwanda. I've used Trekly multiple times for business trips across the country. Always reliable and professional.",
    location: "Kigali, Rwanda",
  },
  {
    name: "Emma Thompson",
    avatar: "",
    rating: 5,
    comment:
      "Our Akagera safari was amazing thanks to the comfortable SUV we rented. The driver option was worth every penny — our guide knew all the best spots!",
    location: "London, UK",
  },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  return (
    <div className="flex flex-col">
      {/* ===== HERO SECTION WITH SLIDESHOW ===== */}
      <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
        {/* Background Slideshow */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0"
          >
            <img
              src={heroSlides[currentSlide].image}
              alt="Rwanda Safari"
              className="w-full h-full object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col justify-center h-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl whitespace-pre-line">
                  {heroSlides[currentSlide].title}
                </h1>
                <p className="mt-6 text-lg text-gray-200 max-w-xl">
                  {heroSlides[currentSlide].subtitle}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Slide indicators */}
            <div className="flex items-center gap-3 mt-8">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setCurrentSlide(i);
                    setIsAutoPlaying(false);
                    setTimeout(() => setIsAutoPlaying(true), 10000);
                  }}
                  className={`transition-all duration-300 rounded-full ${
                    i === currentSlide
                      ? "w-8 h-2 bg-white"
                      : "w-2 h-2 bg-white/50 hover:bg-white/75"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => {
            prevSlide();
            setIsAutoPlaying(false);
            setTimeout(() => setIsAutoPlaying(true), 10000);
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors text-white"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => {
            nextSlide();
            setIsAutoPlaying(false);
            setTimeout(() => setIsAutoPlaying(true), 10000);
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors text-white"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Search Box Overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-20 translate-y-1/2">
          <div className="mx-auto max-w-4xl px-4">
            <SearchBox />
          </div>
        </div>
      </section>

      {/* Spacer for search box overlap */}
      <div className="h-16" />

      {/* ===== POPULAR DESTINATIONS ===== */}
      <section className="py-16 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-heading">
              Popular Destinations
            </h2>
            <p className="mt-2 text-body">
              Explore Rwanda&apos;s most breathtaking locations
            </p>
          </div>
          <Link
            href="/destinations"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {popularDestinations.map((dest) => (
            <DestinationCard
              key={dest.id}
              id={dest.id}
              name={dest.name}
              slug={dest.slug}
              description={dest.description}
              image={dest.image}
              activities={dest.activities}
              featured={dest.featured}
            />
          ))}
        </div>

        <Link
          href="/destinations"
          className="flex sm:hidden items-center justify-center gap-1.5 mt-6 text-sm font-medium text-primary"
        >
          View All Destinations
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* ===== VEHICLE CATEGORIES ===== */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-heading">
              Browse by Category
            </h2>
            <p className="mt-2 text-body">
              Find the perfect vehicle for your adventure
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((cat) => (
              <CategoryCard
                key={cat.slug}
                name={cat.name}
                slug={cat.slug}
                icon={cat.icon}
                count={cat.count}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED VEHICLES ===== */}
      <section className="py-16 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-heading">
              Featured Vehicles
            </h2>
            <p className="mt-2 text-body">
              Top-rated vehicles trusted by thousands of travelers
            </p>
          </div>
          <Link
            href="/vehicles"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} {...vehicle} />
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Link href="/vehicles">
            <Button variant="outline" size="lg">
              Browse All Vehicles
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="py-16 bg-primary text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Why Choose Trekly</h2>
            <p className="mt-2 text-white/80">
              We make your Rwanda adventure seamless from start to finish
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="flex items-center justify-center w-14 h-14 mx-auto rounded-full bg-white/10">
                <Shield className="w-7 h-7" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Fully Insured</h3>
              <p className="mt-2 text-sm text-white/70">
                Every vehicle comes with comprehensive insurance coverage for
                your peace of mind.
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-14 h-14 mx-auto rounded-full bg-white/10">
                <Star className="w-7 h-7" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Top Rated</h3>
              <p className="mt-2 text-sm text-white/70">
                4.9 average rating from thousands of satisfied customers across
                the globe.
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-14 h-14 mx-auto rounded-full bg-white/10">
                <Clock className="w-7 h-7" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">24/7 Support</h3>
              <p className="mt-2 text-sm text-white/70">
                Round-the-clock customer support whenever you need assistance on
                the road.
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-14 h-14 mx-auto rounded-full bg-white/10">
                <MapPin className="w-7 h-7" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Nationwide</h3>
              <p className="mt-2 text-sm text-white/70">
                Pick up and drop off at any location across Rwanda — airports,
                hotels, parks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-16 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-heading">
            What Travelers Say
          </h2>
          <p className="mt-2 text-body">
            Join thousands of happy adventurers
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-card rounded-[16px] border border-gray-100 shadow-sm p-6"
            >
              <Quote className="w-8 h-8 text-primary/20" />
              <RatingStars rating={t.rating} size="sm" className="mt-3" />
              <p className="mt-3 text-sm text-body leading-relaxed">
                &ldquo;{t.comment}&rdquo;
              </p>
              <div className="flex items-center gap-3 mt-5 pt-4 border-t border-gray-100">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="text-sm font-medium text-heading">{t.name}</p>
                  <p className="text-xs text-muted">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-r from-primary to-primary-dark p-10 sm:p-16 text-center text-white">
            <div className="absolute inset-0 opacity-10">
              <img
                src="https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1920&q=80"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold sm:text-4xl">
                Ready for Your Rwanda Adventure?
              </h2>
              <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
                Book your vehicle today and explore the Land of a Thousand Hills
                at your own pace.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                <Link href="/vehicles">
                  <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                    <Car className="w-5 h-5" />
                    Book a Vehicle
                  </Button>
                </Link>
                <Link href="/auth/register?role=company">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10"
                  >
                    Become a Partner
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="py-12 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">500+</p>
              <p className="mt-1 text-sm text-muted">Vehicles Available</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">10,000+</p>
              <p className="mt-1 text-sm text-muted">Happy Travelers</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">30+</p>
              <p className="mt-1 text-sm text-muted">Locations</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">4.9</p>
              <p className="mt-1 text-sm text-muted">Average Rating</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
