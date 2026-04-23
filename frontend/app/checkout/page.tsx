"use client";
import { useState } from "react";
import { useCart } from "@/lib/hooks/useCart";

import CheckoutCard from "@/components/CheckoutCard";
import StepHeader from "@/components/StepHeader";
import CheckoutLayout from "@/components/CheckoutLayout";
import CheckoutDesktop from "@/components/CheckoutDesktop";
import CheckoutMobile from "@/components/CheckoutMobile";
import AddressForm from "@/components/AddressForm";

export default function CheckoutPage() {
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
        title="Shipping and Payment"
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
        <StepHeader />
        <CheckoutCard />
        <AddressForm
          onSubmit={async (data) => {
            console.log("Checkout address:", data);
          }}
          submitLabel="Use this address"
        />
        <button
          className="bg-surface-accent text-main rounded-[26px] w-fit px-[30px] h-[45px] 
         font-semibold text-[20px] leading-[100%] text-center cursor-pointer"
        >
          Add a new delivery address
        </button>
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
