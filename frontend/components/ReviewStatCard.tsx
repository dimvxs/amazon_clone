interface StatCardProps {
  icon?: React.ReactNode; 
  value: string | number;
  label: string;
  width?: string; 
}

export default function ReviewStatCard({
  icon,
  value,
  label,
  width = "w-[258px]",
}: StatCardProps) {
  return (
    <div
      className={`hidden layout-product-sm:flex flex-col items-center  ${width} py-[16.5px] gap-[18px]`}
    >
      {icon ?? <div className="w-[31px] h-[31px] bg-gray-400"></div>}
      <p className="text-[24px] leading-[20px] text-center">{value}</p>
      <p className="text-[16px] leading-[20px] text-center">{label}</p>
    </div>
  );
}