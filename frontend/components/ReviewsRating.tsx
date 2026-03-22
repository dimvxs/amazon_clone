import WriteReviewCTA from "./WriteReviewCTA";
import StarsRating from "./StarsRating";

export default function ReviewsRating() {
  return (
    <div className="bg-red-200 flex flex-col layout-product-sm:w-[183px] w-full items-start layout-product-sm:items-center">
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
    </div>
  );
}
