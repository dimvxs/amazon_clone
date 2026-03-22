export default function RatingBars() {
  const reviews = [
    { rating: 200 },
    { rating: 50 },
    { rating: 20 },
    { rating: 20 },
    { rating: 10 },
  ];
  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return (
    <div className="layout-product-lg:w-[352px] w-full max-w-[352px] hidden layout-product-lg:flex flex-col gap-2">
      {reviews.map((review, index) => {
        const percentage = total ? (review.rating / total) * 100 : 0;
        return (
          <div key={index} className="flex items-start gap-2">
            <span className="w-[51px] text-left text-[13px] leading-[20px]">
              {5 - index} star
            </span>
            <div className="flex-1 bg-white h-[20px] rounded-[4px] border-card overflow-hidden">
              <div
                className="bg-surface-accent h-[20px]"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}