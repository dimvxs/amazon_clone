type WriteReviewCTAProps = {
  showOnLg?: boolean;
};

export default function WriteReviewCTA({ showOnLg = true }: WriteReviewCTAProps) {
  return (
    <div
      className={`layout-product-lg:w-[300px] w-full max-w-[300px]
        ${showOnLg ? 'hidden layout-product-sm:block' : 'block layout-product-sm:hidden'}`}
    >
        <p>Write a Review</p>
        <button className="bg-green-200 w-full">Write a Review</button>
    </div>
  );
}