"use client";

import AllMenuItem from "@/components/AllMenuItem";
import HeaderActionItem from "@/components/HeaderActionItem";
import DeliveryInfo from "@/components/DeliveryInfo";
import SearchBar from "@/components/SearchBar";

export default function HeaderTopBar() {
  return (
    <div className="flex flex-wrap layout-sm:flex-nowrap w-full bg-surface-1 layout-sm:gap-[59px] header-padding">
      {/* Left section*/}
      <div className="pt-4 layout-sm:pt-0 order-1 flex-1 flex items-center justify-start layout-sm:justify-between gap-3">
        <AllMenuItem mobile />
        
        {/* Logo */}
        <img className="w-[98px] h-[34px] bg-surface-3 flex-shrink-0 mr-3 layout-sm:mr-0" />

        <DeliveryInfo />
      </div>

      {/* Middle section*/}
      <div className="py-[10px] order-3 layout-sm:order-2 w-full max-w-[1126px] text-surface-3 flex items-center justify-center">
        <SearchBar />
      </div>

      {/* Right section*/}
      <div className="pt-4 layout-sm:pt-0 order-2 layout-sm:order-3 flex-1 flex items-center justify-end ">
        <div className="w-full flex justify-end layout-sm:justify-between items-center gap-3">
          <HeaderActionItem label="Welcome, sign in" />
          <HeaderActionItem label="Returns & Orders" hideOnMobile />
          <HeaderActionItem label="Cart" />
        </div>
      </div>
    </div>
  );
}
