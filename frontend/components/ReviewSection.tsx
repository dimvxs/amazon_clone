import ReviewFilters from "./ReviewFilters";
import ReviewsRating from "./ReviewsRating";
import UserReviews from "./UserReviews";
import WriteReviewCTA from "./WriteReviewCTA";

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
    <section className="text-default">
      <h1>Customer reviews</h1>
      <div className="w-full flex flex-col layout-product-sm:flex-row items-start justify-between gap-[21px] ">
        <ReviewsRating />
        <div className="layout-product-lg:w-[193px] w-full max-w-[193px] hidden layout-product-lg:block ">
          <div className="bg-blue-100">Review bar</div>
          <div className="bg-blue-100">Review bar</div>
          <div className="bg-blue-100">Review bar</div>
          <div className="bg-blue-100">Review bar</div>
          <div className="bg-blue-100">Review bar</div>
        </div>
        <div className="hidden layout-product-sm:block flex w-[258px] bg-blue-200">
          Verified reviews
        </div>

        <div className="hidden layout-product-sm:block flex w-[300px] bg-blue-200">
          Clients reccomend this product
        </div>
        <WriteReviewCTA />
      </div>
      <ReviewFilters />

      <UserReviews reviews={reviews} />
    </section>
  );
}
