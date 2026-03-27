"use client";
import Link from "next/link";
import Image from "next/image";
import placeholderIcon from "@/assets/icons/placeholder.svg";

const links = [
  { label: "Account Details", href: "/account/details" },
  { label: "Your Orders", href: "/account/orders" },
  { label: "Returns & Refunds", href: "/account/returns" },
  { label: "Your messages", href: "/account/messages" },
  { label: "Addresses", href: "/account/addresses" },
  { label: "Payment Methods", href: "/account/payments" },
  { label: "Your Wishlist", href: "/account/wishlist" },
  { label: "Customer Support", href: "/account/support" },
];

export default function AccountNavigation() {
  return (
    <div className="flex flex-col layout-account-sm:gap-[30px] gap-[20px]">
      <div className="flex bg-gray-600 items-center gap-[12px] px-[16px] py-[12px] rounded-[15px]">
        <div className="w-[70px] h-[70px] bg-gray-400 rounded-full" />
        <div className="flex flex-col">
          <span className="text-[20px] leading-[32px] align-middle">Name</span>
          <span className="text-[13px] leading-[20px] align-middle">
            spinjitsumaster@gmail.com
          </span>
        </div>
      </div>

      <div className="flex bg-gray-600 flex-col py-[30px] gap-[30px] rounded-[15px]">
        <div>
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-[8px] py-[8px] px-[20px]"
            >
              <Image
                src={placeholderIcon}
                alt="icon"
                width={13}
                height={13}
                className="bg-gray-400"
              />
              <span className="text-[20px] leading-[100%] align-middle">
                {item.label}
              </span>
            </Link>
          ))}
        </div>

        <button className="rounded-[20px] px-[34px] py-[10px] text-[20px] leading-[100%] align-middle bg-blue-500 w-fit self-center cursor-pointer">
          Delete Account
        </button>
      </div>
    </div>
  );
}
