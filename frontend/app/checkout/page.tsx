"use client";

import { useState } from "react";
import { useCart } from "@/lib/hooks/useCart";

import StepHeader from "@/components/StepHeader";
import CheckoutLayout from "@/components/CheckoutLayout";
import CheckoutDesktop from "@/components/CheckoutDesktop";
import CheckoutMobile from "@/components/CheckoutMobile";
import AddressForm from "@/components/AddressForm";
import PaymentForm from "@/components/PaymentForm";
import { AddressData } from "@/lib/types/address";
import { PaymentData } from "@/lib/api/payment";

import CheckoutCard from "@/components/CheckoutCard";

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
        <StepHeader
          step={1}
          title="Select delivery address"
          onChange={() => setAddressMode("form")}
        />

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
        {addressMode === "card" && addresses.length > 0 && (
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
                    setAddressMode("form");
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => {
                setEditingIndex(null);
                setAddressMode("form");
              }}
              className="bg-surface-accent text-main rounded-[26px] w-fit px-[30px] h-[45px] 
      font-semibold text-[20px] leading-[100%] text-center cursor-pointer"
            >
              Add a new delivery address
            </button>
          </>
        )}
        <StepHeader
          step={2}
          title="Payment method"
          onChange={() => setPaymentMode("form")}
        />
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
        {paymentMode === "card" && payments.length > 0 && (
          <>
            <div className="flex flex-col gap-[15px]">
              {payments.map((payment, index) => (
                <CheckoutCard
                  key={index}
                  data={[
                    `Visa ending in ${payment.cardNumber.slice(-4)}`,
                    `Name on card: ${payment.nameOnCard}`,
                    `Expires on ${payment.expiryDate}`,
                  ]}
                  onEdit={() => {
                    setEditingPaymentIndex(index);
                    setPaymentMode("form");
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => {
                setEditingPaymentIndex(null);
                setPaymentMode("form");
              }}
              className="bg-surface-accent text-main rounded-[26px] w-fit px-[30px] h-[45px] 
      font-semibold text-[20px] leading-[100%] text-center cursor-pointer"
            >
              Add a new payment method
            </button>
          </>
        )}

        <StepHeader
          step={3}
          title="Cart items"
          onChange={() => setCartMode("open")}
        />
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