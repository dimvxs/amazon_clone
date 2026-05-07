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

      <div className="layout-catalog-lg:hidden w-full bg-red-300 grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-2">
        {chips.map((chip, idx) => (
          <FilterChip
            key={`${chip.key}-${idx}`}
            label={chip.label}
            onClick={() => removeFilter(chip.key, chip.value)}
          />
        ))}
      </div>
      <button
        onClick={clearFilters}
        className="layout-catalog-lg:hidden text-sm underline w-fit"
      >
        Clear all
      </button>
      <span className="text-[clamp(16px,1.5vw,20px)] leading-[20px]">
        1-48 of over 100,000 results for "gaming"
      </span>
    </div>
  );
}
