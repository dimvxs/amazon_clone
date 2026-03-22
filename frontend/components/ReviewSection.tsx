import ReviewFilters from "./ReviewFilters";
import ReviewsRating from "./ReviewsRating";
import UserReviews from "./UserReviews";
import WriteReviewCTA from "./WriteReviewCTA";
import ReviewStatCard from "./ReviewStatCard";
import RatingBars from "./RatingBars";
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
      <h1>Customer reviews</h1>
      <div className="w-full flex flex-col layout-product-sm:flex-row items-stretch  justify-between gap-[21px] ">
        <ReviewsRating />

        <RatingBars/>

        <ReviewStatCard value={176} label="Verified reviews" />
        <ReviewStatCard
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
