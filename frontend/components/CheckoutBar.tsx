"use client";

import Image from "next/image";
import arrowDown from "@/assets/icons/arrow-back.svg";

interface CheckoutBarProps {
  open?: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  total: string;
}

export default function CheckoutBar({
  open,
  setOpen,
  total,
}: CheckoutBarProps) {
  return (
    <div className="flex flex-row layout-account-sm:flex-col justify-between items-center w-full gap-[14px] text-default">
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="flex justify-between font-semibold gap-[10px] layout-account-sm:w-full w-fit"
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

          <span className="whitespace-nowrap shrink-0 ">Item total:</span>
        </div>

        <span>{total}</span>
      </div>

      <button className="bg-blue-400 rounded-full w-fit px-5  layout-account-sm:w-full layout-account-sm:h-[32px] h-[45px]">
        Checkout
      </button>
    </div>
  );
}
