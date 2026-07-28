"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Car,
  CalendarCheck,
  Users,
  Star,
  BarChart3,
  MessageSquare,
  Settings,
  Building2,
} from "lucide-react";

interface SidebarLink {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface SidebarProps {
  links: SidebarLink[];
  className?: string;
}

export function Sidebar({ links, className }: SidebarProps) {
  const pathname = usePathname();

  return (
    <nav className={cn("space-y-1", className)}>
      {links.map((link) => {
        const isActive =
          pathname === link.href || pathname.startsWith(link.href + "/");
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-[10px] transition-colors",
              isActive
                ? "bg-primary/10 text-primary"
                : "text-body hover:text-heading hover:bg-gray-50"
            )}
          >
            <link.icon className="w-5 h-5" />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

export const companySidebarLinks: SidebarLink[] = [
  { href: "/dashboard/company", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/company/vehicles", label: "Vehicles", icon: Car },
  { href: "/dashboard/company/reservations", label: "Reservations", icon: CalendarCheck },
  { href: "/dashboard/company/customers", label: "Customers", icon: Users },
  { href: "/dashboard/company/reviews", label: "Reviews", icon: Star },
  { href: "/dashboard/company/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/company/messages", label: "Messages", icon: MessageSquare },
  { href: "/dashboard/company/profile", label: "Company Profile", icon: Building2 },
  { href: "/dashboard/company/settings", label: "Settings", icon: Settings },
];

export const adminSidebarLinks: SidebarLink[] = [
  { href: "/dashboard/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/admin/users", label: "Users", icon: Users },
  { href: "/dashboard/admin/companies", label: "Companies", icon: Building2 },
  { href: "/dashboard/admin/vehicles", label: "Vehicles", icon: Car },
  { href: "/dashboard/admin/reservations", label: "Reservations", icon: CalendarCheck },
  { href: "/dashboard/admin/reviews", label: "Reviews", icon: Star },
  { href: "/dashboard/admin/messages", label: "Messages", icon: MessageSquare },
  { href: "/dashboard/admin/settings", label: "Settings", icon: Settings },
];
