"use client";

import CartItem from "@/components/CartItem";
import { useState } from "react";
import CheckoutDesktop from "@/components/CheckoutDesktop";
import CheckoutMobile from "@/components/CheckoutMobile";
import CheckCircle from "@/components/CheckCircle";
import { useCart } from "@/lib/hooks/useCart";

export default function CartPage() {
  const [open, setOpen] = useState(false);
  const {
    cartItems,
    shipping,
    itemTotal,
    total,
    allChecked,
    toggleItemChecked,
    toggleSelectAll,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();
  return (
    <main className="w-full flex justify-center flex-col items-center bg-page-default py-[100px]">
      <div
        className="w-full max-w-[1528px] flex flex-col
       gap-[22px] layout-account-sm:px-[54px] px-[21px] "
      >
        <h1 className="text-[24px] leading-[28px] font-semibold">
          Shopping cart
        </h1>
        <div className="flex gap-[10px]">
          <CheckCircle checked={allChecked} onClick={toggleSelectAll} />
          <span className="text-[16px] leading-[28px] font-semibold">
            Select all (2)
          </span>
        </div>
        <div
          className="w-full flex flex-col layout-account-sm:flex-row items-start justify-between 
       gap-[18px] "
        >
          <div className="w-full layout-account-sm:w-[974px] flex flex-col gap-[22px]">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                id={item.id}
                image={item.image}
                title={item.title}
                price={item.price}
                discount={item.discount}
                listPrice={item.listPrice}
                checked={item.checked}
                onToggleCheck={() => toggleItemChecked(item.id)}
                quantity={item.quantity}
                inStock={item.inStock}
                onIncrease={() => increaseQuantity(item.id)}
                onDecrease={() => decreaseQuantity(item.id)}
              />
            ))}
          </div>

          <CheckoutDesktop
            itemTotal={itemTotal}
            setOpen={setOpen}
            shipping={shipping}
            total={total}
          />
        </div>
      </div>

      <CheckoutMobile
        itemTotal={itemTotal}
        setOpen={setOpen}
        shipping={shipping}
        total={total}
        open={open}
      />
    </main>
  );
}
