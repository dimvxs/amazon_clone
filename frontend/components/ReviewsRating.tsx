import WriteReviewCTA from "./WriteReviewCTA";
import StarsRating from "./StarsRating";

export default function ReviewsRating() {
  return (
    <div className="bg-red-200 flex flex-col layout-product-lg:flex-row layout-product-sm:w-[527px] w-full">
      <div className="flex flex-col layout-product-lg:items-center">
        <h1 className="text-lg hidden layout-product-lg:block">Num Rating</h1>
        <div className="flex">
         <StarsRating size={18} />
          <h1 className=" layout-product-lg:hidden">4.4 out of 5</h1>
        </div>
        <p>4,382 global ratings</p>
      </div>

      <div className="layout-product-lg:w-[193px] w-full max-w-[193px]">
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
