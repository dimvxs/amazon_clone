"use client";
import CartItem from "@/components/CartItem";

export default function CartPage() {
  const cartItems = Array.from({ length: 3 });
  return (
    <main className="w-full flex justify-center flex-col items-center bg-page-default">
      <div className="w-full max-w-[1528px] flex flex-col layout-account-sm:flex-row items-start justify-between text-default">
        <div className="w-full layout-account-sm:w-[1143px] gap-2 flex flex-col">
          {cartItems.map((_, index) => (
            <CartItem key={index} />
          ))}
        </div>

        <div className="w-full layout-account-sm:w-[373px] bg-white flex flex-col p-[10px] rounded-[10px] layout-account-sm:min-w-[300px]">
          <span>Order summary</span>
          <span>Item total: 3,800$</span>
          <span>Shipping: 10$</span>
          <button>Checkout</button>
        </div>
      </div>
    </main>
  );
}
