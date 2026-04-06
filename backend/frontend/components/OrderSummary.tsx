"use client";

type OrderSummaryProps = {
  itemTotal: number;
  shipping: number;
};

export default function OrderSummary({ itemTotal, shipping }: OrderSummaryProps) {
  return (
    <div className="flex flex-col gap-[14px] text-default">
      <span className="font-semibold text-lg">Order summary</span>

      <div className="flex justify-between">
        <span>Item total:</span>
        <span>{itemTotal}$</span>
      </div>

      <div className="flex justify-between">
        <span>Shipping</span>
        <span>{shipping}$</span>
      </div>
    </div>
  );
}