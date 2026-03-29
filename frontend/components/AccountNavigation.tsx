"use client";
import Link from "next/link";
import Image from "next/image";
import placeholderIcon from "@/assets/icons/placeholder.svg";
import Avatar from "./Avatar";
import FormButton from "./FormButton";
export const accountNavigationLinks = [
  { label: "Account Details", href: "/account/details" },
  { label: "Your Orders", href: "/account/orders" },
  { label: "Returns & Refunds", href: "/account/returns" },
  { label: "Your messages", href: "/account/messages" },
  { label: "Addresses", href: "/account/addresses" },
  { label: "Payment Methods", href: "/account/payments" },
  { label: "Your Wishlist", href: "/account/wishlist" },
  { label: "Customer Support", href: "/account/support" },
  { label: "Account Details", href: "/account" },
];

export default function AccountNavigation() {
  const handleDelete = () => {
    console.log("Delete account clicked");
  };
  return (
    <div className="flex flex-col layout-account-sm:gap-[30px] gap-[20px]">
      <div className="flex bg-gray-600 items-center gap-[12px] px-[16px] py-[12px] rounded-[15px]">
        <Avatar />

        <div className="flex flex-col">
          <span className="text-[20px] leading-[32px] align-middle">Name</span>
          <span className="text-[13px] leading-[20px] align-middle">
            spinjitsumaster@gmail.com
          </span>
        </div>
      </div>

      <div className="flex bg-gray-600 flex-col py-[30px] gap-[30px] rounded-[15px]">
        <div>
          {accountNavigationLinks
            .filter((item) => item.href !== "/account")
            .map((item) => (
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

        <FormButton className="self-center" onClick={handleDelete}>
          Delete Account
        </FormButton>
      </div>
    </div>
  );
}
