"use client";
export default function OrderSummary() {
  return (
    <div className="flex flex-col gap-[14px] text-default">
      <span className="font-semibold text-lg">Order summary</span>
      <div className="flex justify-between">
        <span>Item total:</span>
        <span>3,800$</span>
      </div>

      <div className="flex justify-between">
        <span>Shipping</span>
        <span>10$</span>
      </div>
    </div>
  );
}
