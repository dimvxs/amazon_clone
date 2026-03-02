export default function DeliveryInfo() {
  return (
    <div className="hidden layout-sm:flex items-center gap-[5px] text-surface-3">
      <div className="w-[18px] h-[18px] bg-surface-3 flex-shrink-0" />

      <div className="flex flex-col leading-tight">
        <span className="text-[11px] font-normal leading-[14px]">
          Delivery to:
        </span>

        <span className="text-[13px] font-bold leading-[15px]">
          Constanta
        </span>
      </div>
    </div>
  );
}