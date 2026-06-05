"use client";

import SearchBarButton from "@/components/SearchBarButton";
import arrowDownIcon from "@/assets/icons/arrow-down.svg";
import searchIcon from "@/assets/icons/search.svg";

export default function SearchBar() {
  return (
    <div className="w-full flex items-center h-10" >
      <SearchBarButton
        icon={arrowDownIcon}
        label="All"
        className="bg-[#2B3242] text-[#E6ECF5]"
        iconHeight={3}
        iconWidth={6}
        hiddenOnMobile
      />

      {/* text-[#1A2030] — цвет букв, которые вводит пользователь
        placeholder-[#5E6E8F] — цвет подсказки "Search", пока инпут пустой
      */}
      <input
        className="h-full w-full bg-[#C5CEE3] border-none outline-none px-[10px] text-[14.3px] leading-none text-[#1A2030] placeholder-[#5E6E8F]"
        type="text"
        aria-label="Search"
        placeholder="Search"
      />

      <SearchBarButton
        icon={searchIcon}
        className="bg-[#2B3242] text-[#E6ECF5]"
      />
    </div>
  );
}