"use client";

import CartItem from "@/components/CartItem";
import { useEffect, useState } from "react";
import CheckoutDesktop from "@/components/CheckoutDesktop";
import CheckoutMobile from "@/components/CheckoutMobile";
import CheckCircle from "@/components/CheckCircle";

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
    <main className="w-full flex justify-center flex-col items-center bg-page-default py-[100px]">
      <div
        className="w-full max-w-[1528px] flex flex-col
       gap-[22px] layout-account-sm:px-[54px] px-[21px] "
      >
        <h1 className="text-[24px] leading-[28px] font-semibold">
          Shopping cart
        </h1>
        <div className="flex gap-[10px]">
          <CheckCircle />
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
                quantity={item.quantity}
                inStock={item.inStock}
                onIncrease={() => updateQuantity(item.id, +1)}
                onDecrease={() => updateQuantity(item.id, -1)}
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
