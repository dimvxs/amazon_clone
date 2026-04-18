import ReviewFilters from "./ReviewFilters";
import ReviewsRating from "./ReviewsRating";
import UserReviews from "./UserReviews";
import WriteReviewCTA from "./WriteReviewCTA";
import ReviewStatCard from "./ReviewStatCard";
import RatingBars from "./RatingBars";
import ReviewModal from "./ReviewModal";
import checkCircle from "@/assets/icons/check_circle.svg";
import thumbUp from "@/assets/icons/thumb_up.svg";
import { useState } from "react";
import { useRouter } from "next/navigation";
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
interface ReviewSectionProps {
  reviews: Review[];
  product: any;
  reviewStats: {
    averageRating: number;
    ratingCount: number;
    ratingCounts: number[];
    verifiedCount: number;
    clientsRecommend: number;
  };
}
export default function ReviewSection({
  reviews,
  product,
  reviewStats,
}: ReviewSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    averageRating,
    ratingCount,
    ratingCounts,
    verifiedCount,
    clientsRecommend,
  } = reviewStats;
  const router = useRouter();
  const handleWriteReview = async () => {
    try {
      const check = await fetch("http://localhost:5012/api/user/islogin", {
        method: "GET",
        credentials: "include",
      });
      const isLoggedIn = await check.json();
      console.log("Is logged in:", isLoggedIn);
      if (isLoggedIn) {
        setIsModalOpen(true);
      } else {
        router.push("/login");
      }
    } catch (err) {
      console.error("Error:", err);
      router.push("/login");
    }
  };
  return (
    <section className="flex flex-col gap-[42px] justify-center items-center">
      <h2 className="text-title-md self-start">Customer reviews</h2>

      <div className="w-full flex flex-col layout-product-sm:flex-row items-stretch justify-between gap-[21px]">
        <ReviewsRating
          averageRating={averageRating}
          ratingCount={ratingCount}
        />
        <RatingBars ratings={ratingCounts} />
        <ReviewStatCard
          iconSrc={checkCircle}
          value={verifiedCount}
          label="Verified reviews"
        />
        <ReviewStatCard
          iconSrc={thumbUp}
          value={clientsRecommend}
          label="Clients recommend this product"
          width="w-[300px]"
        />
        <WriteReviewCTA onClick={handleWriteReview} />
      </div>

      <div className="flex flex-col max-w-[1076px] gap-[21px]">
        <ReviewFilters />
        <UserReviews reviews={reviews} />
      </div>

      <ReviewModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
