import Image from "next/image";
import reviewStar from "@/assets/icons/review-star.svg";

export default function ProductReview() {
  return (
    <div className="flex items-center gap-[3px] text-small-default">
      <span>4.4</span>
      <div className="flex gap-[2px]">
        {Array.from({ length: 5 }).map((_, index) => (
          <Image
            key={index}
            src={reviewStar}
            alt="star"
            width={13}
            height={14}
          />
        ))}
      </div>
      <span>(4,382)</span>
    </div>
  );
}
