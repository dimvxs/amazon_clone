export default function WriteReviewCTA() {
  return (
    <div className="layout-product-lg:w-[283px] w-full max-w-[283px] flex flex-col gap-[13px]">
      <p className="font-bold text-[19px] leading-[24px] align-middle">
        Review this product
      </p>
      <p className="text-[14px] leading-[20px] align-middle">
        Share your thoughts with other customers
      </p>
      <button className="bg-green-200 h-[32px] rounded-[100px] border text-[13px] leading-[20px] text-center flex items-center justify-center">
        Write a customer review
      </button>
    </div>
  );
}