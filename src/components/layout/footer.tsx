import Link from "next/link";
import { Car, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  company: [
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/faq", label: "FAQ" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ],
  vehicles: [
    { href: "/vehicles?category=sedan", label: "Sedans" },
    { href: "/vehicles?category=suv", label: "SUVs" },
    { href: "/vehicles?category=vans", label: "Vans" },
    { href: "/vehicles?category=luxury", label: "Luxury" },
    { href: "/vehicles?category=bus", label: "Buses" },
  ],
  destinations: [
    { href: "/destinations/kigali", label: "Kigali" },
    { href: "/destinations/volcanoes", label: "Volcanoes NP" },
    { href: "/destinations/akagera", label: "Akagera NP" },
    { href: "/destinations/nyungwe", label: "Nyungwe Forest" },
    { href: "/destinations/lake-kivu", label: "Lake Kivu" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-heading text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main footer */}
        <div className="grid grid-cols-1 gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Car className="w-7 h-7 text-primary-light" />
              <span className="text-xl font-bold">Trekly</span>
            </Link>
            <p className="text-sm text-gray-400 max-w-xs">
              Premium vehicle hiring for exploring the Land of a Thousand Hills.
              Trusted, insured, and available across Rwanda.
            </p>
            <div className="space-y-2">
              <a
                href="mailto:info@trekly.com"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                info@trekly.com
              </a>
              <a
                href="tel:+250788123456"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                +250 788 123 456
              </a>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <MapPin className="w-4 h-4" />
                Kigali, Rwanda
              </div>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Company
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Vehicles */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Vehicles
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.vehicles.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Destinations
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.destinations.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 py-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Trekly. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-xs text-gray-500 hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-xs text-gray-500 hover:text-white transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
