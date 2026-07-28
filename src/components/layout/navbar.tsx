"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Car,
  Menu,
  X,
  Search,
  MapPin,
  User,
  Heart,
  LogOut,
  ChevronDown,
  LayoutDashboard,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { createClient } from "@/lib/supabase/client";

const navLinks = [
  { href: "/vehicles", label: "Vehicles" },
  { href: "/destinations", label: "Destinations" },
  { href: "/about", label: "About Rwanda" },
  { href: "/contact", label: "Support" },
];

const partnerLink = { href: "/auth/register?role=company", label: "Become a Partner" };

const roleDashboards: Record<string, string> = {
  tourist: "/tourist",
  company: "/company",
  admin: "/admin",
  driver: "/driver",
};

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      if (s?.user) {
        supabase
          .from("profiles")
          .select("name, role")
          .eq("id", s.user.id)
          .maybeSingle()
          .then(({ data: p }) => setProfile(p));
      }
    });
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setSession(null);
    setProfile(null);
    router.push("/auth/login");
  };

  const user = session?.user;
  const userName = profile?.name || user?.email?.split("@")[0] || "User";
  const role = profile?.role || "tourist";
  const dashboardUrl = roleDashboards[role] || "/tourist";

  return (
    <header className="sticky top-0 z-50 w-full bg-card/95 backdrop-blur-sm border-b border-gray-100">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Car className="w-7 h-7 text-primary" />
            <span className="text-xl font-bold text-heading">Trekly</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-[10px] transition-colors",
                  pathname === link.href || pathname.startsWith(link.href + "/")
                    ? "text-primary bg-primary/5"
                    : "text-body hover:text-heading hover:bg-gray-50"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-2">
            {!user && (
              <Link href={partnerLink.href}>
                <Button variant="ghost" size="sm">
                  {partnerLink.label}
                </Button>
              </Link>
            )}

            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/wishlist"
                  className="p-2 text-body hover:text-primary transition-colors rounded-full hover:bg-gray-50"
                >
                  <Heart className="w-5 h-5" />
                </Link>
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-[10px] hover:bg-gray-50 transition-colors"
                  >
                    <Avatar name={userName} size="sm" />
                    <span className="text-sm font-medium text-heading max-w-[100px] truncate">
                      {userName}
                    </span>
                    <ChevronDown className="w-4 h-4 text-muted" />
                  </button>

                  {userMenuOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setUserMenuOpen(false)}
                      />
                      <div className="absolute right-0 top-full mt-2 w-56 bg-card rounded-[16px] border border-gray-100 shadow-lg z-20 py-2">
                        <Link
                          href={dashboardUrl}
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-body hover:text-heading hover:bg-gray-50 transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          Dashboard
                        </Link>
                        <Link
                          href="/profile"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-body hover:text-heading hover:bg-gray-50 transition-colors"
                        >
                          <User className="w-4 h-4" />
                          Profile
                        </Link>
                        <Link
                          href="/wishlist"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-body hover:text-heading hover:bg-gray-50 transition-colors"
                        >
                          <Heart className="w-4 h-4" />
                          Wishlist
                        </Link>
                        <div className="border-t border-gray-100 my-1" />
                        <button
                          onClick={() => {
                            setUserMenuOpen(false);
                            handleSignOut();
                          }}
                          className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-error hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm">
                    Log in
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button size="sm">Sign up</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-body hover:text-heading transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block px-3 py-2.5 text-sm font-medium rounded-[10px] transition-colors",
                  pathname === link.href
                    ? "text-primary bg-primary/5"
                    : "text-body hover:text-heading hover:bg-gray-50"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-gray-100 space-y-2">
              {user ? (
                <>
                  <Link href={dashboardUrl} onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" fullWidth>
                      Dashboard
                    </Button>
                  </Link>
                  <Link href="/profile" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" fullWidth>
                      Profile
                    </Button>
                  </Link>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleSignOut();
                    }}
                    className="w-full"
                  >
                    <Button variant="ghost" fullWidth>
                      Sign Out
                    </Button>
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" fullWidth>
                      Log in
                    </Button>
                  </Link>
                  <Link href="/auth/register" onClick={() => setMobileMenuOpen(false)}>
                    <Button fullWidth>Sign up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export function MobileBottomNav() {
  const pathname = usePathname();

  const items = [
    { href: "/", icon: Car, label: "Home" },
    { href: "/search", icon: Search, label: "Search" },
    { href: "/trips", icon: MapPin, label: "Trips" },
    { href: "/wishlist", icon: Heart, label: "Wishlist" },
    { href: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-gray-100 md:hidden safe-area-bottom">
      <div className="flex items-center justify-around h-16 px-2">
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-[10px] transition-colors min-w-[56px]",
                isActive ? "text-primary" : "text-muted"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
