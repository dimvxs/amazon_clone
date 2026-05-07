import FilterChip from "./FilterChip";


export default function ProductResultsHeader({
  className = "",
}: {
  className?: string;
}) {
  const filters = [
    "Filter 1",
    "Filter 2",
    "Filter 3",
    "Filter 4",
    "Filter 5",
    "Filter 6",
  ];
  const handleFilterClick = (filter: any) => {
    console.log("Clicked:", filter);
  };
  return (
    <div
      className={`flex layout-catalog-lg:flex-row flex-col w-full
      justify-between layout-catalog-lg:items-center
        gap-[8px] layout-catalog-lg:gap-[20px] ${className}`}
    >
      <h1 className="font-semibold text-[24px] leading-[28px] whitespace-nowrap">
        Electronic devices
      </h1>

      <div className="layout-catalog-lg:hidden w-full bg-red-300 grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-2">
        {filters.map((filter) => (
          <FilterChip
            key={filter}
            label={filter}
            onClick={() => handleFilterClick(filter)}
          />
        ))}
      </div>
      <span className="layout-catalog-lg:hidden">Clear all</span>

      <span className="text-[clamp(16px,1.5vw,20px)] leading-[20px]">
        1-48 of over 100,000 results for "gaming"
      </span>
    </div>
  );
}
