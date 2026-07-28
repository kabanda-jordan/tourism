import Link from "next/link";
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DestinationCardProps {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  activities: string[];
  featured?: boolean;
  className?: string;
}

export function DestinationCard({
  id,
  name,
  slug,
  description,
  image,
  activities,
  featured = false,
  className,
}: DestinationCardProps) {
  return (
    <Link href={`/destinations/${slug}`}>
      <div
        className={`bg-card rounded-[16px] border border-gray-100 shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-1 group ${className}`}
      >
        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {featured && (
            <div className="absolute top-3 left-3">
              <Badge variant="secondary">Popular</Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-center gap-1.5 text-sm text-muted mb-1">
            <MapPin className="w-3.5 h-3.5 text-primary" />
            <span>Rwanda</span>
          </div>
          <h3 className="text-lg font-semibold text-heading group-hover:text-primary transition-colors">
            {name}
          </h3>
          <p className="mt-1.5 text-sm text-muted line-clamp-2">
            {description}
          </p>

          {/* Activities */}
          {activities.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {activities.slice(0, 3).map((activity) => (
                <span
                  key={activity}
                  className="px-2 py-0.5 text-xs bg-gray-100 text-body rounded-full"
                >
                  {activity}
                </span>
              ))}
              {activities.length > 3 && (
                <span className="px-2 py-0.5 text-xs bg-gray-100 text-muted rounded-full">
                  +{activities.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
