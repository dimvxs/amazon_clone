import { useState } from "react";
import UserReview from "./UserReview";

interface Review {
  id: number;
  userName: string;
  title: string;
  date: string;
  country: string;

  fullText: string;
  helpfulCount: number;
  images: string[];
}

interface UserReviewsProps {
  reviews: Review[];
}

export default function UserReviews({ reviews }: UserReviewsProps) {
  const [visibleCount, setVisibleCount] = useState(3);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  return (
    <div className="w-full flex flex-col gap-[16px]">
      {reviews.slice(0, visibleCount).map((review) => (
        <UserReview key={review.id} {...review} />
      ))}

      {visibleCount < reviews.length && (
        <button
          onClick={handleLoadMore}
          className="font-medium text-meta bg-transparent border w-fit mx-auto h-[29px] rounded-[25px] flex items-center px-[20px] mt-[10px]"
        >
          See more reviews
        </button>
      )}
    </div>
  );
}
