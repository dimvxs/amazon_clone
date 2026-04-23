"use client";

import CheckoutCard from "@/components/CheckoutCard";
import StepHeader from "@/components/StepHeader";

export default function CheckoutPage() {
  return (
    <main className="w-full flex justify-center flex-col items-center bg-page-default py-[100px]">
      <div
        className="w-full max-w-[1528px] flex flex-col
        gap-[22px] layout-account-sm:px-[54px] px-[21px] "
      >
        <StepHeader />
        <CheckoutCard />
        <button className="bg-surface-accent text-main rounded-[26px] w-fit px-[30px] h-[45px] 
        font-semibold text-[20px] leading-[100%] text-center cursor-pointer">
          Add a new delivery address
        </button>
      </div>
    </main>
  );
}
