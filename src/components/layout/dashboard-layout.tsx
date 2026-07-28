"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, Car, Calendar, Heart, Star, User, LogOut, Menu, X,
  Users, Building, DollarSign, Shield, AlertTriangle, Settings, TrendingUp,
  MessageSquare, Bell, PlusCircle, Clock, MapPin, ChevronRight, Home,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut, getUser } from "@/lib/actions/auth";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
}

const adminNav: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Companies", href: "/admin/companies", icon: Building },
  { label: "Vehicles", href: "/admin/vehicles", icon: Car },
  { label: "Payments", href: "/admin/payments", icon: DollarSign },
  { label: "Verifications", href: "/admin/verifications", icon: Shield },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

const companyNav: NavItem[] = [
  { label: "Dashboard", href: "/company", icon: LayoutDashboard },
  { label: "Vehicles", href: "/company/vehicles", icon: Car },
  { label: "Add Vehicle", href: "/company/vehicles/new", icon: PlusCircle },
  { label: "Reservations", href: "/company/reservations", icon: Calendar },
  { label: "Analytics", href: "/company/analytics", icon: TrendingUp },
  { label: "Messages", href: "/messages", icon: MessageSquare },
];

const driverNav: NavItem[] = [
  { label: "Dashboard", href: "/driver", icon: LayoutDashboard },
  { label: "Earnings", href: "/driver/earnings", icon: DollarSign },
  { label: "Verification", href: "/driver/verification", icon: Shield },
];

const touristNav: NavItem[] = [
  { label: "Dashboard", href: "/tourist", icon: LayoutDashboard },
  { label: "Vehicles", href: "/vehicles", icon: Car },
  { label: "My Trips", href: "/trips", icon: Calendar },
  { label: "Wishlist", href: "/wishlist", icon: Heart },
  { label: "Reviews", href: "/reviews", icon: Star },
  { label: "Messages", href: "/messages", icon: MessageSquare },
];

const navMap: Record<string, NavItem[]> = {
  admin: adminNav,
  company: companyNav,
  driver: driverNav,
  tourist: touristNav,
};

export default function DashboardLayout({ children, role }: { children: React.ReactNode; role: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navItems = navMap[role] || touristNav;

  useEffect(() => {
    getUser().then(setUser);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    router.push("/auth/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col transition-transform lg:translate-x-0 lg:static lg:z-auto",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Logo */}
        <div className="h-16 flex items-center gap-2 px-5 border-b border-gray-100">
          <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center">
            <Car className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold text-gray-900">Trekly</span>
          <button onClick={() => setSidebarOpen(false)} className="ml-auto lg:hidden">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href + "/"));
            return (
              <Link key={item.href} href={item.href} onClick={() => setSidebarOpen(false)}>
                <div className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  active ? "bg-teal-50 text-teal-700" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                )}>
                  <item.icon className="w-4.5 h-4.5 shrink-0" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto text-[11px] font-semibold bg-teal-100 text-teal-700 px-1.5 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="border-t border-gray-100 p-3">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
              {(user?.email || "U").charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user?.email || "User"}</p>
            </div>
          </div>
          <button onClick={handleSignOut} className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-red-600 transition-colors mt-1">
            <LogOut className="w-4.5 h-4.5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex items-center gap-3 ml-auto">
            <button className="relative text-gray-400 hover:text-gray-600 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center">3</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-sm font-bold text-teal-700">
              {(user?.email || "U").charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
