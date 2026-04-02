"use client";

import CartItem from "@/components/CartItem";
import { useState } from "react";
import OrderSummary from "@/components/OrderSummary";
import CheckoutBar from "@/components/CheckoutBar";
import PaymentOptions from "@/components/PaymentOptions";

export default function CartPage() {
  const [open, setOpen] = useState(false);
  const cartItems = Array.from({ length: 3 });
  return (
    <main className="w-full flex justify-center flex-col items-center bg-page-default">
      <div className="w-full max-w-[1528px] flex flex-col layout-account-sm:flex-row items-start justify-between text-default gap-[12px]">
        <div className="w-full layout-account-sm:w-[1143px] gap-2 flex flex-col">
          {cartItems.map((_, index) => (
            <CartItem key={index} />
          ))}
        </div>
        <div className="w-full hidden flex-col gap-[18px] layout-account-sm:w-[373px] layout-account-sm:min-w-[300px] layout-account-sm:flex  ">
          <div className="bg-white flex flex-col gap-[14px] p-[10px] rounded-[10px] ">
            <OrderSummary />
            <CheckoutBar setOpen={setOpen} total="3,810$" />
          </div>
          <div className="bg-white flex flex-col gap-[12px] p-[10px] rounded-[10px]">
            <span>Pay with</span>

            <PaymentOptions />
            <span>Protection</span>
            <span>
              Get a full refund if the item is not as described or not delivered
            </span>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full z-50 bg-red-300 layout-account-sm:hidden flex h-[80px] items-center px-[30px]">
        <CheckoutBar open={open} setOpen={setOpen} total="3,810$" />
      </div>

      <div
        className={`px-[40px] pt-[24px] pb-[12px] fixed z-49 left-0 bottom-[80px] w-full bg-white transition-transform duration-300 layout-account-sm:hidden  ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <OrderSummary />
      </div>
    </main>
  );
}
