"use client";

import Image from "next/image";
import arrowDownIcon from "@/assets/icons/arrow-down.svg";
import searchIcon from "@/assets/icons/search.svg";

export default function SearchBar() {
  return (
    <div className="w-full flex items-center text-light">
      <button className="w-[45px] h-[40px] gap-1 bg-button-header-dark flex items-center justify-center flex-shrink-0 hidden layout-sm:flex whitespace-nowrap cursor-pointer">
        <span className="text-[11px]">All</span>
        <Image
          src={arrowDownIcon}
          alt="arrow down"
          className="object-contain "
        />
      </button>

      <input
        className="h-10 w-full bg-input-header-surface border-none outline-none px-[10px] text-[14.3px] leading-none"
        type="text"
        aria-label="Search"
        placeholder="Search"
      />

      <button className="w-[45px] h-[40px] bg-button-header-light flex items-center justify-center flex-shrink-0 cursor-pointer">
        <Image
          src={searchIcon}
          alt="search"
          className="w-[17px] h-[17px] object-contain"
        />
      </button>
    </div>
  );
}
