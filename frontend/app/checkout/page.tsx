"use client";

import { useState } from "react";
import { useCart } from "@/lib/hooks/useCart";
import { AddressData } from "@/lib/types/address";

import CheckoutCard from "@/components/CheckoutCard";
import StepHeader from "@/components/StepHeader";
import CheckoutLayout from "@/components/CheckoutLayout";
import CheckoutDesktop from "@/components/CheckoutDesktop";
import CheckoutMobile from "@/components/CheckoutMobile";
import AddressForm from "@/components/AddressForm";

type StepState = "idle" | "form" | "card";
export default function CheckoutPage() {
  const [stepState, setStepState] = useState<StepState>("idle");
  const [addresses, setAddresses] = useState<AddressData[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const {
    shipping,
    selectedCount,
    itemTotal,
    discountPercent,
    subtotal,
    total,
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
            setOpen={() => {}}
            shipping={shipping}
            total={total}
          />
        }
      >

        <StepHeader
          step={1}
          title="Select delivery address"
          onChange={() => setStepState("form")}
        />

        {stepState === "form" && (
          <AddressForm
            defaultValues={
              editingIndex !== null ? addresses[editingIndex] : undefined
            }
            onSubmit={async (data) => {
              setAddresses((prev) => {
                if (editingIndex !== null) {
                  const updated = [...prev];
                  updated[editingIndex] = data as AddressData;
                  return updated;
                }
                return [...prev, data as AddressData];
              });

              setEditingIndex(null);
              setStepState("card");
            }}
            submitLabel="Use this address"
          />
        )}
        {stepState === "card" && addresses.length > 0 && (
          <>
            <div className="flex flex-col gap-[15px]">
              {addresses.map((address, index) => (
                <CheckoutCard
                  key={index}
                  data={[
                    `${address.firstName} ${address.lastName}`,
                    `Phone number: ${address.phone}`,
                    `${address.street} ${address.houseNumber}, ${address.city}, ${address.state}, ${address.country}, ${address.postalCode}`,
                  ]}
                  onEdit={() => {
                    setEditingIndex(index);
                    setStepState("form");
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => {
                setEditingIndex(null);
                setStepState("form");
              }}
              className="bg-surface-accent text-main rounded-[26px] w-fit px-[30px] h-[45px] 
              font-semibold text-[20px] leading-[100%] text-center cursor-pointer"
            >
              Add a new delivery address
            </button>
          </>
        )}
      </CheckoutLayout>

      {selectedCount > 0 && (
        <CheckoutMobile
          discount={discountPercent}
          itemTotal={itemTotal}
          setOpen={() => {}}
          shipping={shipping}
          total={total}
          open={false}
        />
      )}
    </>
  );
}
