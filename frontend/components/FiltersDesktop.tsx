"use client";
import FilterSection from "./FilterSection";
import PriceRange from "./PriceRange";
import StarsRating from "./StarsRating";

export default function FiltersDesktop({
  filters,
  onChange,
  selectedFilters,
}: {
  filters: any[];
  onChange: (key: string, value: any, type: string) => void;
  selectedFilters: any;
}) {
  return (
    <div className="w-full max-w-[200px] flex-col layout-catalog-lg:flex hidden">
      {filters.map((filter) => (
        <FilterSection key={filter.key} title={filter.title}>
          {filter.type === "single_select" && (
            <ul className="flex flex-col gap-[20px] pb-[16px]">
              {filter.options?.map((item: any) => (
                <li
                  key={item}
                  className="text-[14px] leading-[16px] cursor-pointer"
                  onClick={() => onChange(filter.key, item, filter.type)}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}

          {filter.type === "multiselect" && (
            <ul className="flex flex-col gap-[10px] pb-[16px]">
              {filter.options?.map((item: any) => (
                <li
                  key={item}
                  className="flex items-center gap-[8px] text-[14px] leading-[16px]"
                >
                  <label className="flex items-center gap-[8px] cursor-pointer w-full">
                    <input
                      type="checkbox"
                      onChange={() => onChange(filter.key, item, filter.type)}
                    />
                    <span>{item}</span>
                  </label>
                </li>
              ))}
            </ul>
          )}

          {filter.type === "range" && (
            <div className="flex flex-col gap-[20px] pb-[16px]">
              <PriceRange
                min={filter.min!}
                max={filter.max!}
                onChange={(val) => onChange(filter.key, val, filter.type)}
              />
            </div>
          )}

          {filter.type === "rating" && (
            <div className="flex flex-col gap-[10px] pb-[16px]">
              <StarsRating
                size={13}
                interactive
                rating={selectedFilters[filter.key]}
                onChange={(val: number) =>
                  onChange(filter.key, val, filter.type)
                }
              />
            </div>
          )}
        </FilterSection>
      ))}
    </div>
  );
}
