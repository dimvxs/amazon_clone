import WriteReviewCTA from "./WriteReviewCTA";

export default function ReviewsRating() {
  return (
    <div className="bg-red-200 flex flex-col layout-product-lg:flex-row layout-product-sm:w-[527px] w-full">
      <h1>Price</h1>
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
