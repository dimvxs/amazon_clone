import CartQuantityControl from "./CartQuantityControl";
import Image from "next/image";
import placeholder from "@/assets/icons/delete.svg";

export default function CartItem() {
  return (
    <div className="flex items-center gap-[12px]">
      <div className="size-[28px] rounded-full bg-gray-200 flex items-center justify-center shrink-0" />

      <div className="p-[10px] rounded-[10px] bg-white w-full flex gap-[12px]">
        <div className="size-[60px] sm:size-[135px] rounded-[10px] bg-gray-200 shrink-0" />

        <div className="flex flex-col gap-[8px] w-full">
          <div className="flex justify-between items-start gap-[12px]">
            <span className="max-w-[90%]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </span>
            <Image
              src={placeholder}
              alt="delete"
              className="shrink-0 cursor-pointer"
            />
          </div>

          <span className="sm:block hidden">In Stock</span>
          <hr />

          <div className="flex sm:flex-row flex-col justify-between items-start w-full">
            <span>Additional info</span>
            <div className="sm:basis-[300px] shrink flex bg-red-200 w-full justify-between">
              <CartQuantityControl /> <span>1,899.30$</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
