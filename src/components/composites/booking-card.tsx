import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Car } from "lucide-react";
import { formatPrice, formatDate } from "@/lib/utils";
import Link from "next/link";

interface BookingCardProps {
  id: string;
  bookingCode: string;
  vehicleName: string;
  vehicleImage?: string;
  pickupDate: string;
  dropoffDate: string;
  pickupLocation?: string;
  totalPrice: number;
  status: "pending" | "approved" | "cancelled" | "completed";
  paymentStatus: string;
  className?: string;
}

const statusVariants: Record<string, "warning" | "success" | "danger" | "default"> = {
  pending: "warning",
  approved: "success",
  cancelled: "danger",
  completed: "success",
};

const statusLabels: Record<string, string> = {
  pending: "Pending",
  approved: "Approved",
  cancelled: "Cancelled",
  completed: "Completed",
};

export function BookingCard({
  id,
  bookingCode,
  vehicleName,
  vehicleImage,
  pickupDate,
  dropoffDate,
  pickupLocation,
  totalPrice,
  status,
  paymentStatus,
  className,
}: BookingCardProps) {
  return (
    <Link href={`/trips/${id}`}>
      <div
        className={`bg-card rounded-[16px] border border-gray-100 shadow-sm overflow-hidden transition-shadow duration-200 hover:shadow-md cursor-pointer ${className}`}
      >
        <div className="flex flex-col sm:flex-row">
          {/* Image */}
          {vehicleImage && (
            <div className="sm:w-40 h-32 sm:h-auto shrink-0">
              <img
                src={vehicleImage}
                alt={vehicleName}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div className="flex-1 p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-semibold text-heading">
                    {vehicleName}
                  </h3>
                  <Badge variant={statusVariants[status]}>
                    {statusLabels[status]}
                  </Badge>
                </div>
                <p className="text-xs text-muted mt-0.5 font-mono">
                  #{bookingCode}
                </p>
              </div>
              <span className="text-lg font-bold text-heading font-mono">
                {formatPrice(totalPrice)}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(pickupDate)} — {formatDate(dropoffDate)}
              </span>
              {pickupLocation && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  {pickupLocation}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
