import WriteReviewCTA from "./WriteReviewCTA";
import StarsRating from "./StarsRating";

export default function ReviewsRating() {
  return (
    <div className="bg-red-200 flex flex-col layout-product-lg:flex-row layout-product-sm:w-[527px] w-full">
      <div className="flex flex-col items-center w-fit">
        <h1 className="font-normal text-[64px] leading-[64px] align-middle">
          4.4
        </h1>
        <div className="flex">
          <StarsRating size={18} />
        </div>
        <p className="font-normal text-[14px] leading-[20px] align-middle">
          4,382 global ratings
        </p>
      </div>

      <div className="layout-product-lg:w-[193px] w-full max-w-[193px] hidden layout-product-lg:block ">
        <div className="bg-blue-100">Review bar</div>
        <div className="bg-blue-100">Review bar</div>
        <div className="bg-blue-100">Review bar</div>
        <div className="bg-blue-100">Review bar</div>
        <div className="bg-blue-100">Review bar</div>
      </div>
      <WriteReviewCTA showOnLg={false} />
    </div>
  );
}
