"use client";

type OrderSummaryProps = {
  itemTotal: number;
  shipping: number;
};

export default function OrderSummary({
  itemTotal,
  shipping,
}: OrderSummaryProps) {
  const rows = [
    { label: "Item total:", value: `${itemTotal}$` },
    { label: "Discount:", value: "-16%" },
    { label: "Shipping", value: `${shipping}$` },
  ];

  return (
    <div className="flex flex-col gap-[14px] text-black">
      <span className="font-semibold text-lg ">Order summary</span>
      <div className="flex flex-col gap-[14px]">
        {rows.map((row, i) => (
          <div
            key={i}
            className="flex justify-between border-b last:border-none py-[4px] text-black/60 border-black/20"
          >
            <span>{row.label}</span>
            <span>{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
