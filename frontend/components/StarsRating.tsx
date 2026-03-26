import Image from "next/image";
import reviewStar from "@/assets/icons/review-star.svg";

interface StarsProps {
  size?: number;
  gap?: number;
}

export default function StarsRating({ size = 16, gap = 2 }: StarsProps) {
  return (
    <div className="flex" style={{ gap: `${gap}px` }}>
      {Array.from({ length: 5 }).map((_, idx) => (
        <Image
          key={idx}
          src={reviewStar}
          alt="star"
          width={size}
          height={size}
        />
      ))}
    </div>
  );
}
