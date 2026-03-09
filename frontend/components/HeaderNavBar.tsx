"use client";

import AllMenuItem from "./AllMenuItem";

const navItems = [
  "Deals",
  "Delivery today",
  "Verified sellers",
  "Easy returns",
];

export default function HeaderNavBar() {
  return (
    <div className="w-full py-[9.5px] flex items-center bg-surface-muted text-light header-padding">
      {/* Left side item */}
      <div className="flex-1 flex items-center">
        <AllMenuItem desktop />
      </div>

      {/* Center section */}
      <div className="w-full max-w-[700px] h-full flex items-center justify-between gap-[10px] ">
        {navItems.map((item) => (
          <span key={item} className="text-center">
            {item}
          </span>
        ))}
      </div>
      {/* Spacer */}
      <div className="flex-1 flex items-center" />
    </div>
  );
}
