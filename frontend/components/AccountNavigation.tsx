"use client";
import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";
import { USER_KEY, fetcher } from "@/lib/api/user";

import personIcon from "@/assets/icons/person.svg";
import ordersIcon from "@/assets/icons/orders.svg";
import returnsIcon from "@/assets/icons/sync_alt.svg";
import messagesIcon from "@/assets/icons/mail.svg";
import addressIcon from "@/assets/icons/location_on.svg";
import paymentIcon from "@/assets/icons/credit_card.svg";
import wishlistIcon from "@/assets/icons/favorite.svg";
import supportIcon from "@/assets/icons/help.svg";
import Avatar from "./Avatar";
import FormButton from "./FormButton";

type UserData = {
  avatar?: string;
  firstName: string;
  email: string;
  lastName: string;
};

export const accountNavigationLinks = [
  { label: "Account Details", href: "/account/details", icon: personIcon },
  { label: "Your Orders", href: "/account/orders", icon: ordersIcon },
  { label: "Returns & Refunds", href: "/account/returns", icon: returnsIcon },
  { label: "Your messages", href: "/account/messages", icon: messagesIcon },
  { label: "Addresses", href: "/account/addresses", icon: addressIcon },
  { label: "Payment Methods", href: "/account/payments", icon: paymentIcon },
  { label: "Your Wishlist", href: "/account/wishlist", icon: wishlistIcon },
  { label: "Customer Support", href: "/account/support", icon: supportIcon },
  { label: "Account Overview", href: "/account", icon: personIcon },
];

export default function AccountNavigation() {
  const { data: userData } = useSWR<UserData>(USER_KEY, fetcher);
  const handleDelete = () => {
    console.log("Delete account clicked");
  };
  return (
    <div className="flex flex-col layout-account-sm:gap-[30px] gap-[20px]">
      <div className="flex card-default items-center gap-[12px] px-[16px] py-[12px] ">
        <Avatar src={userData?.avatar} />

        <div className="flex flex-col">
          <span className="text-[20px] leading-[32px] align-middle">
            {userData?.firstName}
          </span>
          <span className="text-[13px] leading-[20px] align-middle">
            {userData?.email}
          </span>
        </div>
      </div>

      <div className="flex flex-col py-[30px] layout-account-sm:gap-[80px] gap-[30px] card-default">
        <div>
          {accountNavigationLinks
            .filter((item) => item.href !== "/account")
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-[8px] py-[8px] px-[20px]"
              >
                <Image src={item.icon} alt="icon" width={13} height={13} />
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
