"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, Users, MapPin, Star, Shield, Check, ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { cn, formatPrice } from "@/lib/utils";
import { useToast } from "@/components/ui/toast";

const packages = [
  {
    id: "gorilla-trekking",
    title: "Gorilla Trekking Safari",
    subtitle: "1 Day · Volcanoes National Park",
    description: "Track mountain gorillas through the misty Virunga rainforest. Includes permit, transport, and expert guide.",
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80",
    price: 1500,
    duration: "1 day",
    groupSize: "1-8",
    location: "Volcanoes National Park",
    rating: 4.9,
    highlights: ["Gorilla permit ($1,500 pp)", "Professional guide", "Park entrance fees", "Lunch & water"],
  },
  {
    id: "akagera-game-drive",
    title: "Akagera Game Drive",
    subtitle: "Full Day · Akagera National Park",
    description: "Explore Rwanda's only Big Five savannah park. Spot lions, elephants, giraffes, zebras, and more.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
    price: 250,
    duration: "1 day",
    groupSize: "2-6",
    location: "Akagera National Park",
    rating: 4.8,
    highlights: ["Game drive vehicle", "Park entrance fees", "Experienced ranger guide", "Picnic lunch"],
  },
  {
    id: "nyungwe-chimp",
    title: "Nyungwe Chimpanzee Trek",
    subtitle: "1 Day · Nyungwe Forest",
    description: "Trek through ancient rainforest to observe wild chimpanzees and colobus monkeys.",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
    price: 200,
    duration: "1 day",
    groupSize: "2-8",
    location: "Nyungwe Forest",
    rating: 4.7,
    highlights: ["Chimpanzee permit", "Forest guide", "Canopy walk access", "Lunch & refreshments"],
  },
  {
    id: "lake-kivu-combo",
    title: "Lake Kivu Explorer",
    subtitle: "2 Days · Rubavu / Gisenyi",
    description: "Relax on the beaches of Lake Kivu, kayak the Congo-Nile Trail, and enjoy a sunset boat cruise.",
    image: "https://images.pexels.com/photos/31850571/pexels-photo-31850571.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 350,
    duration: "2 days",
    groupSize: "2-10",
    location: "Lake Kivu, Gisenyi",
    rating: 4.6,
    highlights: ["Beach resort stay", "Kayaking equipment", "Sunset boat cruise", "All meals included"],
  },
  {
    id: "rwanda-grand",
    title: "Rwanda Grand Safari",
    subtitle: "5 Days · All Major Parks",
    description: "The ultimate Rwandan adventure — gorilla trekking, game drives, chimpanzee tracking, and Lake Kivu relaxation.",
    image: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&q=80",
    price: 2500,
    duration: "5 days / 4 nights",
    groupSize: "2-8",
    location: "Multiple Parks",
    rating: 5.0,
    highlights: ["Gorilla trekking permit", "Akagera game drive", "Nyungwe canopy walk", "Lake Kivu resort", "All transport", "Full-board meals"],
  },
  {
    id: "golden-monkey",
    title: "Golden Monkey Tracking",
    subtitle: "Half Day · Volcanoes NP",
    description: "Track the rare golden monkeys in the bamboo forests of Volcanoes National Park.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    price: 150,
    duration: "Half day",
    groupSize: "2-8",
    location: "Volcanoes National Park",
    rating: 4.5,
    highlights: ["Golden monkey permit", "Local guide", "Park fees", "Light refreshments"],
  },
];

export default function SafariPage() {
  const { toast } = useToast();
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    travelers: "2",
    date: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPackage) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    toast("success", "Booking request sent! We'll contact you within 24 hours to confirm your safari.");
    setFormData({ name: "", email: "", phone: "", travelers: "2", date: "", message: "" });
    setSelectedPackage(null);
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-72 bg-gradient-to-r from-primary to-primary-dark">
        <img
          src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1920&q=80"
          alt="Safari in Rwanda"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-3xl font-bold sm:text-4xl">Safari Packages</h1>
            <p className="mt-2 text-white/80 text-lg">Curated wildlife adventures across Rwanda</p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Safari" }]} />

        <p className="mt-6 text-body leading-relaxed max-w-3xl">
          Experience Rwanda&apos;s incredible wildlife with our expertly curated safari packages. From tracking
          mountain gorillas in Volcanoes National Park to spotting the Big Five in Akagera, we make it seamless.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={cn(
                "bg-card rounded-[16px] border shadow-sm overflow-hidden transition-all hover:shadow-md",
                selectedPackage === pkg.id ? "border-primary ring-2 ring-primary/20" : "border-gray-100"
              )}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold text-primary">
                  {formatPrice(pkg.price)} <span className="text-xs text-muted font-normal">/pp</span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-1 text-sm mb-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium text-heading">{pkg.rating}</span>
                </div>
                <h3 className="text-lg font-semibold text-heading">{pkg.title}</h3>
                <p className="text-xs text-muted mt-0.5">{pkg.subtitle}</p>
                <p className="text-sm text-body mt-2 line-clamp-2">{pkg.description}</p>

                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{pkg.duration}</span>
                  <span className="flex items-center gap-1"><Users className="w-3 h-3" />{pkg.groupSize}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{pkg.location}</span>
                </div>

                <ul className="mt-3 space-y-1">
                  {pkg.highlights.slice(0, 3).map((h) => (
                    <li key={h} className="flex items-center gap-1.5 text-xs text-body">
                      <Check className="w-3 h-3 text-success shrink-0" />{h}
                    </li>
                  ))}
                  {pkg.highlights.length > 3 && (
                    <li className="text-xs text-muted">+{pkg.highlights.length - 3} more</li>
                  )}
                </ul>

                <Button
                  fullWidth
                  className="mt-4"
                  variant={selectedPackage === pkg.id ? "primary" : "outline"}
                  onClick={() => {
                    setSelectedPackage(pkg.id === selectedPackage ? null : pkg.id);
                  }}
                >
                  {selectedPackage === pkg.id ? "Selected" : "Book This Safari"}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {selectedPackage && (
          <div className="mt-12 bg-card rounded-[16px] border border-gray-100 shadow-sm p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold text-heading">
                Book {packages.find((p) => p.id === selectedPackage)?.title}
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Full Name" placeholder="Your name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
              <Input label="Email" type="email" placeholder="your@email.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
              <Input label="Phone" placeholder="+250 7XX XXX XXX" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
              <Select label="Travelers" value={formData.travelers} onChange={(e) => setFormData({ ...formData, travelers: e.target.value })} options={[
                { value: "1", label: "1 person" },
                { value: "2", label: "2 people" },
                { value: "3", label: "3 people" },
                { value: "4", label: "4 people" },
                { value: "5", label: "5 people" },
                { value: "6", label: "6 people" },
                { value: "7", label: "7 people" },
                { value: "8", label: "8 people" },
              ]} />
              <div className="sm:col-span-2">
                <Input label="Preferred Date" type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} min={new Date().toISOString().split("T")[0]} required />
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-heading">Special Requests</label>
                <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Any special requirements, dietary needs, or questions..."
                  className="mt-1 w-full rounded-[12px] border border-gray-200 px-3 py-2 text-sm placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary min-h-[80px]" />
              </div>
              <div className="sm:col-span-2 flex gap-3">
                <Button type="submit" loading={submitting}>
                  <ArrowRight className="w-4 h-4" />
                  Send Booking Request
                </Button>
                <Button type="button" variant="outline" onClick={() => setSelectedPackage(null)}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        <div className="mt-16 bg-primary/5 rounded-[16px] p-6 sm:p-8 text-center">
          <Shield className="w-10 h-10 text-primary mx-auto" />
          <h2 className="mt-3 text-xl font-semibold text-heading">Book With Confidence</h2>
          <p className="mt-2 text-body max-w-lg mx-auto">
            All our safari packages include expert guides, park fees, and 24/7 support.
            Your adventure is fully insured and backed by our 100% satisfaction guarantee.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-8 text-sm text-muted">
            <span>✓ Park fees included</span>
            <span>✓ Professional guides</span>
            <span>✓ Free cancellation</span>
            <span>✓ 24/7 support</span>
          </div>
        </div>
      </div>
    </div>
  );
}
