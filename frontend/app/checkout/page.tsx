"use client";

import CheckoutCard from "@/components/CheckoutCard";

export default function LogInPage() {
  return (
    <main className="w-full flex justify-center flex-col items-center bg-page-default py-[100px]">
      <div
        className="w-full max-w-[1528px] flex flex-col
        gap-[22px] layout-account-sm:px-[54px] px-[21px] "
      >
        <CheckoutCard/>
      </div>
    </main>
  );
}
