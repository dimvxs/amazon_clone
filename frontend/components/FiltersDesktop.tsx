"use client";
import FilterSection from "./FilterSection";
import PriceRange from "./PriceRange";
import StarsRating from "./StarsRating";

export default function FiltersDesktop() {
  const departments = [
    "Mobile Phones",
    "Laptops & Notebooks",
    "Tablets & eReaders",
    "Smart Watches & Wearables",
    "Headphones & Earbuds",
    "Speakers & Audio Systems",
    "Gaming Consoles",
    "PC Components",
    "Computer Accessories",
    "Cameras & Photography",
    "Smart Home Devices",
    "Storage Devices",
    "Networking Equipment",
  ];

  const brands = [
    "Razer",
    "ASUS",
    "Logitech",
    "Lenovo",
    "MSI",
    "SteelSeries",
    "HP",
  ];

  const conditions = ["New", "Renewed", "Used"];

  return (
    <div className="w-full max-w-[200px] flex-col layout-catalog-lg:flex hidden">
      <FilterSection title="Department">
        <ul className="flex flex-col gap-[20px] pb-[16px]">
          {departments.map((item, index) => (
            <li key={index} className="text-[14px] leading-[16px]">
              {item}
            </li>
          ))}
        </ul>
      </FilterSection>

      <FilterSection title="Customer Reviews›">
        <ul className="flex flex-col gap-[10px] pb-[16px]">
          <StarsRating size={13} />
        </ul>
      </FilterSection>

      <FilterSection title="Featured Brands">
        <ul className="flex flex-col gap-[10px] pb-[16px]">
          {brands.map((item, index) => (
            <li
              key={index}
              className="flex items-center gap-[8px] text-[14px] leading-[16px]"
            >
              <label className="flex items-center gap-[8px] cursor-pointer w-full">
                <input type="checkbox" />
                <span>{item}</span>
              </label>
            </li>
          ))}
        </ul>
      </FilterSection>

      <FilterSection title="Price">
        <div className="flex flex-col gap-[20px] pb-[16px]">
          <PriceRange />
        </div>
      </FilterSection>

      <FilterSection title="Condition">
        <ul className="flex flex-col gap-[10px] pb-[16px]">
          {conditions.map((item, index) => (
            <li
              key={index}
              className="flex items-center gap-[8px] text-[14px] leading-[16px]"
            >
              <label className="flex items-center gap-[8px] cursor-pointer w-full">
                <input type="checkbox" />
                <span>{item}</span>
              </label>
            </li>
          ))}
        </ul>
      </FilterSection>
    </div>
  );
}
