import { cn } from "@/lib/utils";
import { Search, CalendarX, Heart, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    href: string;
  };
  className?: string;
}

function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 px-6 text-center",
        className
      )}
    >
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
        {icon || <Search className="w-8 h-8 text-muted" />}
      </div>
      <h3 className="text-lg font-semibold text-heading">{title}</h3>
      <p className="mt-2 text-sm text-muted max-w-sm">{description}</p>
      {action && (
        <Link href={action.href} className="mt-6">
          <Button>{action.label}</Button>
        </Link>
      )}
    </div>
  );
}

function NoBookingsEmpty() {
  return (
    <EmptyState
      icon={<CalendarX className="w-8 h-8 text-muted" />}
      title="No bookings yet"
      description="Start exploring Rwanda's beautiful destinations and book your first vehicle rental."
      action={{ label: "Browse Vehicles", href: "/vehicles" }}
    />
  );
}

function NoFavoritesEmpty() {
  return (
    <EmptyState
      icon={<Heart className="w-8 h-8 text-muted" />}
      title="No favorites saved"
      description="Save vehicles you love by clicking the heart icon. They'll appear here for easy access."
      action={{ label: "Discover Vehicles", href: "/vehicles" }}
    />
  );
}

function NoResultsEmpty({ query }: { query?: string }) {
  return (
    <EmptyState
      icon={<Search className="w-8 h-8 text-muted" />}
      title={query ? `No results for "${query}"` : "No results found"}
      description="Try adjusting your search filters or browse all available vehicles."
      action={{ label: "View All Vehicles", href: "/vehicles" }}
    />
  );
}

function NoDataEmpty({ title = "No data available" }: { title?: string }) {
  return (
    <EmptyState
      icon={<FolderOpen className="w-8 h-8 text-muted" />}
      title={title}
      description="There's nothing to show here yet. Check back later."
    />
  );
}

export { EmptyState, NoBookingsEmpty, NoFavoritesEmpty, NoResultsEmpty, NoDataEmpty };
