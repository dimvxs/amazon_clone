"use client";

import CartItem from "@/components/CartItem";
import CartItemCard from "@/components/CartItemCard";
import CheckoutDesktop from "@/components/CheckoutDesktop";
import CheckoutMobile from "@/components/CheckoutMobile";
import SelectAllCart from "@/components/SelectAllCart";

import { useState } from "react";
import { useCart } from "@/lib/hooks/useCart";

export default function CartPage() {
  const [open, setOpen] = useState(false);
  const {
    cartItems,
    shipping,
    cartCount,
    selectedCount,
    itemTotal,
    discountPercent,
    subtotal,
    total,
    allChecked,
    toggleItemChecked,
    toggleSelectAll,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
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

        <SelectAllCart
          checked={allChecked}
          count={cartCount}
          onToggle={toggleSelectAll}
        />

        <div
          className="w-full flex flex-col layout-account-sm:flex-row items-start justify-between 
          gap-[18px] "
        >
          <div className="w-full layout-account-sm:w-[974px] flex flex-col gap-[22px]">
            {cartItems.length === 0 ? (
              <CartItemCard>
                <span className="text-[20px] leading-[100%] px-[14px]">
                  No items
                </span>
              </CartItemCard>
            ) : (
              cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  checked={item.checked}
                  onToggleCheck={() => toggleItemChecked(item.id)}
                  onIncrease={() => increaseQuantity(item.id)}
                  onDecrease={() => decreaseQuantity(item.id)}
                  onDelete={() => removeFromCart(item.id)}
                />
              ))
            )}
          </div>
          <CheckoutDesktop
            selectedCount={selectedCount}
            discount={discountPercent}
            subtotal={subtotal}
            itemTotal={itemTotal}
            setOpen={setOpen}
            shipping={shipping}
            total={total}
          />
        </div>
      </div>
      {selectedCount > 0 && (
        <CheckoutMobile
          discount={discountPercent}
          itemTotal={itemTotal}
          setOpen={setOpen}
          shipping={shipping}
          total={total}
          open={open}
        />
      )}
    </main>
  );
}
