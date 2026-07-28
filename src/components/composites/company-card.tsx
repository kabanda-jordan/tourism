import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { RatingStars } from "@/components/ui/rating-stars";
import { Building2 } from "lucide-react";

interface CompanyCardProps {
  id: string;
  name: string;
  logoUrl?: string;
  vehicleCount: number;
  averageRating: number;
  totalReviews: number;
  verified?: boolean;
  className?: string;
}

export function CompanyCard({
  id,
  name,
  logoUrl,
  vehicleCount,
  averageRating,
  totalReviews,
  verified = false,
  className,
}: CompanyCardProps) {
  return (
    <Link href={`/companies/${id}`}>
      <div
        className={`bg-card rounded-[16px] border border-gray-100 shadow-sm p-5 transition-all duration-200 hover:shadow-md hover:-translate-y-1 cursor-pointer ${className}`}
      >
        <div className="flex items-center gap-4">
          <Avatar src={logoUrl} name={name} size="lg" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold text-heading truncate">
                {name}
              </h3>
              {verified && (
                <Badge variant="success" size="sm">Verified</Badge>
              )}
            </div>
            <p className="text-sm text-muted mt-0.5">
              {vehicleCount} vehicle{vehicleCount !== 1 ? "s" : ""}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <RatingStars rating={averageRating} size="sm" />
              <span className="text-xs text-muted">
                ({totalReviews} reviews)
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
