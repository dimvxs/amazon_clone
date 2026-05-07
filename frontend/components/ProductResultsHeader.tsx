import FilterChip from "./FilterChip";

export default function ProductResultsHeader({
  className = "",
  selectedFilters,
}: {
  className?: string;
  selectedFilters: any;
}) {
  function getActiveFilterChips(selectedFilters: any) {
    const chips: { key: string; value: string }[] = [];

    Object.entries(selectedFilters).forEach(([key, value]) => {
      if (!value) return;
      if (Array.isArray(value)) {
        value.forEach((v) => {
          chips.push({ key, value: v });
        });
        return;
      }
      if (
        key === "price" &&
        value &&
        typeof value === "object" &&
        "min" in value &&
        "max" in value
      ) {
        const price = value as { min: number; max: number };

        chips.push({
          key,
          value: `${price.min} - ${price.max}`,
        });
        return;
      }
      if (key === "rating") {
        chips.push({
          key,
          value: `${value}★`,
        });
        return;
      }
      chips.push({
        key,
        value: String(value),
      });
    });

    return chips;
  }

  const handleFilterClick = (filter: any) => {
    console.log("Clicked:", filter);
  };
  
  const chips = getActiveFilterChips(selectedFilters);
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
        {chips.map((chip, idx) => (
          <FilterChip
            key={`${chip.key}-${idx}`}
            label={chip.value}
            onClick={() => {
              console.log("remove:", chip);
            }}
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
