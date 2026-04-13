import Star from "@/assets/icons/review-star.svg?react";

interface StarsProps {
  size?: number;
  gap?: number;
  dark?: boolean;
  rating?: number;
}

export default function StarsRating({
  size = 16,
  gap = 2,
  dark = false,
  rating,
}: StarsProps) {
  const value = rating !== undefined ? Math.floor(rating) : null;

  return (
    <div className="flex" style={{ gap: `${gap}px` }}>
      {Array.from({ length: 5 }).map((_, idx) => {
        const isFilled = value !== null && idx < value;

        return (
          <Star
            key={idx}
            width={size}
            height={size}
            className={
              isFilled
                ? "text-star"
                : dark
                ? "text-gray-900"
                : "text-main"
            }
          />
        );
      })}
    </div>
  );
}