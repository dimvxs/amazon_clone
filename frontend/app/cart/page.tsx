"use client";

import CartItem from "@/components/CartItem";
import { useEffect, useState } from "react";
import OrderSummary from "@/components/OrderSummary";
import CheckoutBar from "@/components/CheckoutBar";
import PaymentOptions from "@/components/PaymentOptions";

type CartItemType = {
  id: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
  inStock: boolean;
};

export default function CartPage() {
  const [open, setOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [shipping, setShipping] = useState(0);

  const updateQuantity = (id: number, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + delta),
            }
          : item,
      ),
    );
  };

  useEffect(() => {
    const fetchCart = async () => {
      const res = await fetch("/data/cart.json");
      const data = await res.json();
      setCartItems(data.items);
      setShipping(data.shipping);
    };
    fetchCart();
  }, []);

  const itemTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const total = itemTotal + shipping;

  return (
    <main className="w-full flex justify-center flex-col items-center bg-page-default">
      <div
        className="w-full max-w-[1528px] flex flex-col layout-account-sm:flex-row items-start justify-between 
      text-default gap-[18px] layout-account-sm:px-[54px] px-[21px]"
      >
        <div className="w-full layout-account-sm:w-[974px] flex flex-col gap-[22px]">
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              id={item.id}
              image={item.image}
              title={item.title}
              price={item.price}
              quantity={item.quantity}
              inStock={item.inStock}
              onIncrease={() => updateQuantity(item.id, +1)}
              onDecrease={() => updateQuantity(item.id, -1)}
            />
          ))}
        </div>
        <div className="w-full hidden flex-col gap-[18px] layout-account-sm:w-[373px] layout-account-sm:min-w-[300px] layout-account-sm:flex  ">
          <div className="bg-white flex flex-col gap-[14px] p-[10px] rounded-[10px] ">
            <OrderSummary itemTotal={itemTotal} shipping={shipping} />
            <CheckoutBar setOpen={setOpen} total={total} />
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

      <div className="fixed bottom-0 left-0 w-full z-50 bg-white layout-account-sm:hidden flex h-[80px] items-center px-[30px]">
        <CheckoutBar open={open} setOpen={setOpen} total={total} />
      </div>

      <div
        className={`px-[40px] pt-[24px] pb-[12px] fixed z-49 left-0 bottom-[80px] w-full bg-white transition-transform duration-300 layout-account-sm:hidden  ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <OrderSummary itemTotal={itemTotal} shipping={shipping} />
      </div>
    </main>
  );
}
