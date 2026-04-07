"use client";

import Image from "next/image";
import arrowDown from "@/assets/icons/arrow-back.svg";

interface CheckoutBarProps {
  open?: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  total: number;
}

export default function CheckoutBar({
  open,
  setOpen,
  total,
}: CheckoutBarProps) {
  return (
    <div className="flex flex-row layout-account-sm:flex-col justify-between items-center w-full gap-[14px]">
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-start justify-between gap-[10px] layout-account-sm:w-full w-fit text-black"
      >
        <div className="flex items-center gap-[10px] ">
          <button className="layout-account-sm:hidden flex items-center shrink-0">
            <Image
              src={arrowDown}
              alt="Toggle order summary"
              width={11}
              height={6}
              className={`transition-transform duration-300 ${
                open ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>

          <span
            className="whitespace-nowrap shrink-0 
          checkout-text-lg font-normal layout-account-sm:font-semibold"
          >
            Item total:
          </span>
        </div>

        <span className="layout-account-sm:checkout-text-md checkout-text-lg">
          {total}$
        </span>
      </div>

      <button className="w-fit layout-account-sm:w-full layout-account-sm:h-[32px] h-[45px] 
      bg-blue-400 rounded-full px-5 font-semibold layout-account-sm:text-[14px] text-[20px] leading-[20px]">
        Checkout
      </button>
    </div>
  );
}
