import { useState } from "react";
import UserReview from "./UserReview";
import ReviewFilters from "./ReviewFilters";

interface Review {
  id: number;
  userName: string;
  title: string;
  date: string;
  fullText: string;
  helpfulCount: number;
  images: string[];
}

interface UserReviewsProps {
  reviews: Review[];
  showOnLarge?: boolean;
}

export default function UserReviews({ reviews, showOnLarge = true }: UserReviewsProps) {
  const [visibleCount, setVisibleCount] = useState(3);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const visibilityClasses = showOnLarge
    ? "hidden layout-product-lg:block"
    : "block layout-product-lg:hidden";

  return (
    <div className={`w-full bg-purple-200 flex flex-col gap-5 ${visibilityClasses}`}>
      <ReviewFilters />
      {!showOnLarge && (
        <div className="w-full bg-red-200">
          <h1>Customers say</h1>
          <p>Text</p>
        </div>
      )}

      {reviews.slice(0, visibleCount).map((review) => (
        <UserReview key={review.id} {...review} />
      ))}

      {visibleCount < reviews.length && (
        <button onClick={handleLoadMore}>See more</button>
      )}
    </div>
  );
}