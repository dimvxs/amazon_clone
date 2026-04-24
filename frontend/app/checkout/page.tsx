"use client";

import { useState } from "react";
import { useCart } from "@/lib/hooks/useCart";

import CheckoutLayout from "@/components/CheckoutLayout";
import CheckoutDesktop from "@/components/CheckoutDesktop";
import CheckoutMobile from "@/components/CheckoutMobile";

import CheckoutStep from "@/components/CheckoutStep";
import CheckoutCardList from "@/components/CheckoutCardList";

import AddressForm from "@/components/AddressForm";
import PaymentForm from "@/components/PaymentForm";

import { AddressData } from "@/lib/types/address";
import { PaymentData } from "@/lib/api/payment";
import { useEditableList } from "@/lib/hooks/useEditableList";


export default function CheckoutPage() {
  type StepMode = "form" | "card" | "open";
  const address = useEditableList<AddressData>();
  const payment = useEditableList<PaymentData>();
  const [cartMode, setCartMode] = useState<StepMode>("card");

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
        <CheckoutStep
          step={1}
          title="Select delivery address"
          mode={address.mode}
          changeLabel="Change"
          onOpen={() => address.setMode("form")}
        >
          {address.mode === "form" && (
            <AddressForm
              defaultValues={
                address.editingIndex !== null
                  ? address.items[address.editingIndex]
                  : undefined
              }
              onSubmit={address.saveItem}
              submitLabel="Use this address"
            />
          )}

          {address.mode === "card" && (
            <CheckoutCardList
              items={address.items}
              renderItem={(a) => [
                `${a.firstName} ${a.lastName}`,
                `Phone number: ${a.phone}`,
                `${a.street} ${a.houseNumber}, ${a.city}, ${a.state}, ${a.country}, ${a.postalCode}`,
              ]}
              onEdit={address.editItem}
              onAdd={address.addNew}
              addLabel="Add a new delivery address"
            />
          )}
        </CheckoutStep>

        <CheckoutStep
          step={2}
          title="Payment method"
          changeLabel="Change"
          mode={payment.mode}
          onOpen={() => payment.setMode("form")}
        >
          {payment.mode === "form" && (
            <PaymentForm
              onSubmit={payment.saveItem}
              submitLabel="Use this card"
              disableCheckbox={true}
            />
          )}

          {payment.mode === "card" && (
            <CheckoutCardList
              items={payment.items}
              renderItem={(p) => [
                `Visa ending in ${p.cardNumber.slice(-4)}`,
                `Name on card: ${p.nameOnCard}`,
                `Expires on ${p.expiryDate}`,
              ]}
              onEdit={payment.editItem}
              onAdd={payment.addNew}
              addLabel="Add a new payment method"
            />
          )}
        </CheckoutStep>

        <CheckoutStep
          step={3}
          title="Cart items"
          mode={cartMode}
          onOpen={() => setCartMode("open")}
        >
          {cartMode === "open" && (
            <div className="bg-non-active rounded-[20px] p-[20px]">
              <div className="text-[18px] font-semibold mb-[10px]">
                Cart items (placeholder)
              </div>

              <div className="flex flex-col gap-[10px] text-[14px] text-accent-muted">
                <span>• Item 1</span>
                <span>• Item 2</span>
                <span>• Item 3</span>
              </div>
            </div>
          )}
        </CheckoutStep>
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
