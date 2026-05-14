import FilterChip from "./FilterChip";

import { getActiveFilterChips } from "@/lib/utils/filters";
import { SelectedFilters } from "@/lib/utils/filters";

type FilterChip = {
  key: keyof SelectedFilters;
  value: any;
  label: string;
};
export default function ProductResultsHeader({
  className = "",
  selectedFilters,
  removeFilter,
  clearFilters,
}: {
  className?: string;
  selectedFilters: SelectedFilters;
  removeFilter: (key: string, value?: any) => void;
  clearFilters: () => void;
}) {
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
      {chips.length > 0 && (
        <div
          className="layout-catalog-lg:hidden w-full gap-y-[8px] gap-x-[4px]
            grid  
            layout-filters-lg:grid-cols-5 
            layout-filters-md:grid-cols-4 
            layout-filters-sm:grid-cols-3
            layout-filters-xs:grid-cols-2
            grid-cols-1"
        >
          {chips.map((chip, idx) => (
            <FilterChip
              key={`${chip.key}-${idx}`}
              label={chip.label}
              onClick={() => removeFilter(chip.key, chip.value)}
            />
          ))}
        </div>
      )}

      <button
        onClick={clearFilters}
        className="layout-catalog-lg:hidden text-[14px] leading-[20px] underline w-fit text-accent-muted"
      >
        Clear all
      </button>

      <span className="text-[clamp(16px,1.5vw,20px)] leading-[20px] text-accent-muted">
        1-48 of over 100,000 results for "gaming"
      </span>
    </div>
  );
}
