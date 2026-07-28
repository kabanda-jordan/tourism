import { RatingStars } from "@/components/ui/rating-stars";
import { Avatar } from "@/components/ui/avatar";
import { formatDate } from "@/lib/utils";

interface ReviewCardProps {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  photos?: string[];
  companyReply?: string;
  className?: string;
}

export function ReviewCard({
  id,
  userName,
  userAvatar,
  rating,
  comment,
  date,
  photos,
  companyReply,
  className,
}: ReviewCardProps) {
  return (
    <div className={`bg-card rounded-[16px] border border-gray-100 p-5 ${className}`}>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Avatar src={userAvatar} name={userName} size="md" />
          <div>
            <h4 className="text-sm font-semibold text-heading">{userName}</h4>
            <p className="text-xs text-muted">{formatDate(date)}</p>
          </div>
        </div>
        <RatingStars rating={rating} size="sm" />
      </div>

      {/* Comment */}
      <p className="mt-3 text-sm text-body leading-relaxed">{comment}</p>

      {/* Photos */}
      {photos && photos.length > 0 && (
        <div className="flex gap-2 mt-3 overflow-x-auto">
          {photos.map((photo, i) => (
            <img
              key={i}
              src={photo}
              alt={`Review photo ${i + 1}`}
              className="w-20 h-20 object-cover rounded-[10px] shrink-0"
            />
          ))}
        </div>
      )}

      {/* Company Reply */}
      {companyReply && (
        <div className="mt-4 p-3 bg-gray-50 rounded-[12px]">
          <p className="text-xs font-medium text-muted mb-1">Company Reply</p>
          <p className="text-sm text-body">{companyReply}</p>
        </div>
      )}
    </div>
  );
}
