"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/lib/hooks/useCart";

import CheckoutLayout from "@/components/CheckoutLayout";
import CheckoutDesktop from "@/components/CheckoutDesktop";
import CheckoutMobile from "@/components/CheckoutMobile";
import CartItem from "@/components/CartItem";

import CheckoutStep from "@/components/CheckoutStep";
import CheckoutCardList from "@/components/CheckoutCardList";
import ShippingChecks from "@/components/ShippingChecks";

import AddressForm from "@/components/AddressForm";
import PaymentForm from "@/components/PaymentForm";

import { AddressData } from "@/lib/types/address";
import { PaymentData } from "@/lib/api/payment";
import { useEditableList } from "@/lib/hooks/useEditableList";
import { CartItemType } from "@/contexts/cart.context";

export type StepMode = "form" | "card" | "open";

export default function CheckoutPage() {
  const [cartMode, setCartMode] = useState<StepMode>("card");
  const [mockCartItems, setMockCartItems] = useState<CartItemType[]>([]);

  const [selectedShipping, setSelectedShipping] = useState<number | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<number | null>(null);

  const address = useEditableList<AddressData>();
  const payment = useEditableList<PaymentData>();
  const {
    shipping,
    selectedCount,
    itemTotal,
    discountPercent,
    subtotal,
    total,
  } = useCart();

  const shippingChecks = [
    {
      label: "9 - 14 businessdays after shipping",
      subLabel: "29.30$ - Expected Shipping",
    },
    {
      label: "5 - 7 businessdays after shipping",
      subLabel: "39.90$ - Express Shipping",
    },
  ];
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/data/cart.json");
        if (!res.ok) throw new Error("Failed to load cart mock");

        const data = await res.json();
        setMockCartItems(data.items);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

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
              selectedIndex={selectedAddress}
              onSelect={(index) => {
                setSelectedAddress(index);
                console.log("Selected address id:", index);
              }}
            />
          )}
        </CheckoutStep>

        <CheckoutStep
          step={2}
          title="Payment method"
          changeLabel="Change"
          mode={payment.mode}
          onOpen={() => payment.setMode("form")}
          disabled={address.items.length === 0}
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
              selectedIndex={selectedPayment}
              onSelect={(index) => {
                setSelectedPayment(index);
                console.log("Selected payment index:", index);
              }}
            />
          )}
        </CheckoutStep>

        <CheckoutStep
          step={3}
          title="Cart items"
          mode={cartMode}
          onOpen={() => setCartMode("open")}
          disabled={payment.items.length === 0}
        >
          {cartMode === "open" && (
            <>
              <span className="text-accent-muted">
                Order now and we'll notify you by email when we have an
                estimated delivery date for this item.
              </span>
              <div className="flex gap-[28px]">
                <div className="flex flex-col gap-[10px] max-w-[634px]">
                  {mockCartItems.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onToggleCheck={() => console.log("toggle", item.id)}
                      onIncrease={() => console.log("increase", item.id)}
                      onDecrease={() => console.log("decrease", item.id)}
                      onDelete={(id) => console.log("delete", id)}
                    />
                  ))}
                </div>
                <ShippingChecks
                  items={shippingChecks}
                  selectedIndex={selectedShipping}
                  onSelect={(index) => {
                    setSelectedShipping(index);
                    console.log("Selected shipping:", shippingChecks[index]);
                  }}
                />
              </div>
            </>
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
