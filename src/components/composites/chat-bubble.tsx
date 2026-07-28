import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { formatDate } from "@/lib/utils";

interface ChatBubbleProps {
  message: string;
  senderName: string;
  senderAvatar?: string;
  timestamp: string;
  isOwn: boolean;
  className?: string;
}

export function ChatBubble({
  message,
  senderName,
  senderAvatar,
  timestamp,
  isOwn,
  className,
}: ChatBubbleProps) {
  return (
    <div
      className={cn(
        "flex gap-2.5 max-w-[80%]",
        isOwn ? "ml-auto flex-row-reverse" : "",
        className
      )}
    >
      {!isOwn && (
        <Avatar src={senderAvatar} name={senderName} size="sm" />
      )}
      <div>
        <div
          className={cn(
            "px-4 py-2.5 text-sm leading-relaxed",
            isOwn
              ? "bg-primary text-white rounded-[16px] rounded-tr-[4px]"
              : "bg-gray-100 text-heading rounded-[16px] rounded-tl-[4px]"
          )}
        >
          {message}
        </div>
        <p
          className={cn(
            "text-[10px] text-muted mt-1",
            isOwn ? "text-right" : "text-left"
          )}
        >
          {formatDate(timestamp)}
        </p>
      </div>
    </div>
  );
}
