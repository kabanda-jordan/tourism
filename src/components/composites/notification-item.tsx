import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  CreditCard,
  MessageSquare,
  Star,
  Bell,
  Tag,
} from "lucide-react";

interface NotificationItemProps {
  type: "booking" | "payment" | "message" | "review" | "system" | "promotion";
  title: string;
  body?: string;
  read: boolean;
  date: string;
  onClick?: () => void;
  className?: string;
}

const typeIcons = {
  booking: Calendar,
  payment: CreditCard,
  message: MessageSquare,
  review: Star,
  system: Bell,
  promotion: Tag,
};

const typeColors = {
  booking: "text-primary",
  payment: "text-success",
  message: "text-accent",
  review: "text-secondary",
  system: "text-muted",
  promotion: "text-secondary",
};

export function NotificationItem({
  type,
  title,
  body,
  read,
  date,
  onClick,
  className,
}: NotificationItemProps) {
  const Icon = typeIcons[type];

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left flex items-start gap-3 p-4 transition-colors rounded-[12px]",
        read
          ? "hover:bg-gray-50"
          : "bg-primary/5 hover:bg-primary/10",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center w-9 h-9 rounded-full shrink-0",
          read ? "bg-gray-100" : "bg-primary/10"
        )}
      >
        <Icon className={cn("w-4 h-4", typeColors[type])} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p
            className={cn(
              "text-sm truncate",
              read ? "text-body" : "font-semibold text-heading"
            )}
          >
            {title}
          </p>
          {!read && (
            <div className="w-2 h-2 bg-primary rounded-full shrink-0" />
          )}
        </div>
        {body && (
          <p className="text-xs text-muted mt-0.5 line-clamp-2">{body}</p>
        )}
        <p className="text-[10px] text-muted mt-1">{date}</p>
      </div>
    </button>
  );
}
