import ReviewFilters from "./ReviewFilters";
import ReviewsRating from "./ReviewsRating";
import UserReviews from "./UserReviews";
import WriteReviewCTA from "./WriteReviewCTA";
import ReviewStatCard from "./ReviewStatCard";
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
        <div className="layout-product-lg:w-[352px] w-full max-w-[352px] hidden layout-product-lg:block ">
          <div className="bg-blue-100">Review bar</div>
          <div className="bg-blue-100">Review bar</div>
          <div className="bg-blue-100">Review bar</div>
          <div className="bg-blue-100">Review bar</div>
          <div className="bg-blue-100">Review bar</div>
        </div>
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
