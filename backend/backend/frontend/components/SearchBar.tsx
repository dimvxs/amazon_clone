"use client";

import Image from "next/image";
import SearchBarButton from "@/components/SearchBarButton";
import arrowDownIcon from "@/assets/icons/arrow-down.svg";
import searchIcon from "@/assets/icons/search.svg";

export default function SearchBar() {
  return (
    <div className="w-full flex items-center text-light h-10">
      <SearchBarButton
        icon={arrowDownIcon}
        label="All"
        className="bg-button-header-dark"
        hiddenOnMobile
      />

      <input
        className="h-full w-full bg-input-header-surface border-none outline-none px-[10px] text-[14.3px] leading-none"
        type="text"
        aria-label="Search"
        placeholder="Search"
      />

      <SearchBarButton
        icon={searchIcon}
        className="bg-button-header-light"
      />
    </div>
  );
}
