import Link from "next/link";
import { Car, Bus, Truck, Bike, Star, Crown } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  name: string;
  slug: string;
  icon: string;
  count: number;
  className?: string;
}

const iconMap: Record<string, React.ReactNode> = {
  sedan: <Car className="w-8 h-8" />,
  suv: <Car className="w-8 h-8" />,
  van: <Bus className="w-8 h-8" />,
  bus: <Bus className="w-8 h-8" />,
  truck: <Truck className="w-8 h-8" />,
  motorcycle: <Bike className="w-8 h-8" />,
  luxury: <Crown className="w-8 h-8" />,
};

export function CategoryCard({
  name,
  slug,
  icon,
  count,
  className,
}: CategoryCardProps) {
  return (
    <Link href={`/vehicles?category=${slug}`}>
      <div
        className={cn(
          "flex flex-col items-center gap-3 p-6 bg-card rounded-[16px] border border-gray-100 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-1 hover:border-primary/20 cursor-pointer",
          className
        )}
      >
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary">
          {iconMap[icon] || <Car className="w-8 h-8" />}
        </div>
        <div className="text-center">
          <h3 className="text-base font-semibold text-heading">{name}</h3>
          <p className="text-sm text-muted mt-0.5">
            {count} vehicle{count !== 1 ? "s" : ""}
          </p>
        </div>
      </div>
    </Link>
  );
}
