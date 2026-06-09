"use client";

import { useState } from "react";
import { useCart } from "@/lib/hooks/useCart";

import CartItem from "@/components/CartItem";
import CartItemCard from "@/components/CartItemCard";
import CheckoutDesktop from "@/components/CheckoutDesktop";
import CheckoutMobile from "@/components/CheckoutMobile";
import SelectAllCart from "@/components/SelectAllCart";

import CheckoutLayout from "@/components/CheckoutLayout";

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
    <>
      <CheckoutLayout
        title="Shopping cart"
        header={
          <SelectAllCart
            checked={allChecked}
            count={cartCount}
            onToggle={toggleSelectAll}
          />
        }
        sidebar={
          <CheckoutDesktop
            selectedCount={selectedCount}
            discount={discountPercent}
            subtotal={subtotal}
            itemTotal={itemTotal}
            setOpen={setOpen}
            shipping={shipping}
            total={total}
          />
        }
      >
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
      </CheckoutLayout>

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
    </>
  );
}
