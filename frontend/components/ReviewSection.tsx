import ReviewFilters from "./ReviewFilters";
import ReviewsRating from "./ReviewsRating";
import UserReviews from "./UserReviews";
import WriteReviewCTA from "./WriteReviewCTA";
import ReviewStatCard from "./ReviewStatCard";
import RatingBars from "./RatingBars";

import checkCircle from "@/assets/icons/check_circle.svg";
import thumbUp from "@/assets/icons/thumb_up.svg";

interface Review {
  id: number;
  userName: string;
  title: string;
  date: string;
  fullText: string;
  helpfulCount: number;
  images: string[];
}

interface ReviewSectionProps {
  reviews: Review[];
}

export default function ReviewSection({ reviews }: ReviewSectionProps) {
  return (
    <section className="text-default flex flex-col gap-[21px]">
      <h2 className="text-title-md">Customer reviews</h2>
      <div className="w-full flex flex-col layout-product-sm:flex-row items-stretch justify-between gap-[21px] ">
        <ReviewsRating />
        <RatingBars />
        <ReviewStatCard
          iconSrc={checkCircle}
          value={176}
          label="Verified reviews"
        />

        <ReviewStatCard
          iconSrc={thumbUp}
          value={176}
          label="Clients recommend this product"
          width="w-[300px]"
        />
        <WriteReviewCTA />
      </div>
      <ReviewFilters />
      <UserReviews reviews={reviews} />
    </section>
  );
}
