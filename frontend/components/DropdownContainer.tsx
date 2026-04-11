import Image from "next/image";
import arrowDown from "@/assets/icons/arrow-back.svg";

type DropdownContainerProps = {
  label: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
};

export default function DropdownContainer({
  label,
  open,
  onToggle,
  children,
}: DropdownContainerProps) {
  return (
    <div className="relative inline-block bg-blue-200 rounded-[20px] px-[12px]">
      {/* ghost element */}
      <div className="invisible h-0 overflow-visible">
        <div className="pt-[20px] pb-[16px] pl-[12px] pr-[25px]">
          {children}
        </div>
      </div>

      <button
        type="button"
        onClick={onToggle}
        className="relative z-20 flex justify-between items-center w-full h-[34px] gap-5"
      >
        <span className="whitespace-nowrap">{label}</span>

        <Image
          src={arrowDown}
          alt="Toggle dropdown"
          width={11}
          height={6}
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      <div
        className={`
          absolute left-0 top-full w-full
          bg-blue-200 z-10
          rounded-b-[13px]
          transform -translate-y-[16px]
          transition-all duration-300
          grid
          overflow-hidden
          ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}
        `}
      >
        <div className="overflow-hidden ">
          <div
            className="pt-[20px] pb-[16px] pl-[12px] pr-[25px] 
            text-[14px] leading-[16px]"
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
