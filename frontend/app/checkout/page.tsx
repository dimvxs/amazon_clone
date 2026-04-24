"use client";

import { useState } from "react";
import { useCart } from "@/lib/hooks/useCart";

import CheckoutLayout from "@/components/CheckoutLayout";
import CheckoutDesktop from "@/components/CheckoutDesktop";
import CheckoutMobile from "@/components/CheckoutMobile";
import AddressForm from "@/components/AddressForm";
import PaymentForm from "@/components/PaymentForm";
import { AddressData } from "@/lib/types/address";
import { PaymentData } from "@/lib/api/payment";

import CheckoutStep from "@/components/CheckoutStep";
import CheckoutCardList from "@/components/CheckoutCardList";

export default function CheckoutPage() {
  type StepMode = "form" | "card" | "open";
  const [cartMode, setCartMode] = useState<StepMode>("card");
  const [addressMode, setAddressMode] = useState<StepMode>("card");
  const [paymentMode, setPaymentMode] = useState<StepMode>("card");
  const [addresses, setAddresses] = useState<AddressData[]>([]);
  const [payments, setPayments] = useState<PaymentData[]>([]);
  const [editingPaymentIndex, setEditingPaymentIndex] = useState<number | null>(
    null,
  );
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
        <CheckoutStep
          step={1}
          title="Select delivery address"
          mode={addressMode}
          onOpen={() => setAddressMode("form")}
        >
          {addressMode === "form" && (
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
                setAddressMode("card");
              }}
              submitLabel="Use this address"
            />
          )}

          {addressMode === "card" && (
            <CheckoutCardList
              items={addresses}
              renderItem={(address) => [
                `${address.firstName} ${address.lastName}`,
                `Phone number: ${address.phone}`,
                `${address.street} ${address.houseNumber}, ${address.city}, ${address.state}, ${address.country}, ${address.postalCode}`,
              ]}
              onEdit={(index) => {
                setEditingIndex(index);
                setAddressMode("form");
              }}
              onAdd={() => {
                setEditingIndex(null);
                setAddressMode("form");
              }}
              addLabel="Add a new delivery address"
            />
          )}
        </CheckoutStep>
        <CheckoutStep
          step={2}
          title="Payment method"
          mode={paymentMode}
          onOpen={() => setPaymentMode("form")}
        >
          {paymentMode === "form" && (
            <PaymentForm
              onSubmit={async (data) => {
                setPayments((prev) => {
                  if (editingPaymentIndex !== null) {
                    const updated = [...prev];
                    updated[editingPaymentIndex] = data;
                    return updated;
                  }
                  return [...prev, data];
                });

                setEditingPaymentIndex(null);
                setPaymentMode("card");
              }}
              submitLabel="Use this card"
              disableCheckbox={true}
            />
          )}

          {paymentMode === "card" && (
            <CheckoutCardList
              items={payments}
              renderItem={(payment) => [
                `Visa ending in ${payment.cardNumber.slice(-4)}`,
                `Name on card: ${payment.nameOnCard}`,
                `Expires on ${payment.expiryDate}`,
              ]}
              onEdit={(index) => {
                setEditingPaymentIndex(index);
                setPaymentMode("form");
              }}
              onAdd={() => {
                setEditingPaymentIndex(null);
                setPaymentMode("form");
              }}
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
