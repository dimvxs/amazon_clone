export default function ProductResultsHeader({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`flex layout-catalog-lg:flex-row flex-col w-full
      justify-between layout-catalog-lg:items-center
        gap-[8px] layout-catalog-lg:gap-[20px] ${className}`}
    >
      <h1 className="font-semibold text-[24px] leading-[28px] whitespace-nowrap">
        Electronic devices
      </h1>

      <span className="text-[clamp(16px,1.5vw,20px)] leading-[20px]">
        1-48 of over 100,000 results for "gaming"
      </span>

      <div className="flex layout-catalog-lg:hidden flex-col gap-[4px]">
        <span>Filter 1</span>
        <span>Filter 1</span>
        <span>Filter 1</span>
        <span>Clear all</span>
      </div>
    </div>
  );
}
