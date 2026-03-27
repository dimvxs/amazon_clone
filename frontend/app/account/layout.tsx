"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isRoot = pathname === "/account";

  return (
    <main className="w-full flex justify-center flex-col items-center bg-page-default py-[100px]">
      <div className="w-full max-w-[1528px] flex flex-col gap-[20px] layout-account-sm:flex-row">
        <div
          className={`
            w-full bg-green-500
            layout-account-sm:min-w-[250px] layout-account-sm:w-[373px]
            ${!isRoot ? "hidden layout-account-xs:block" : ""}
          `}
        >
          Navigation
          <div className="flex flex-col">
            <Link href="/account/details">Account Details</Link>
            <Link href="/account/orders">Your Orders</Link>
          </div>
        </div>

        <div
          className={`
            w-full bg-red-500 flex flex-col gap-[12px] layout-account-xs:px-[40px] px-[10px] py-[26px]
            layout-account-sm:w-[1082px]
            ${isRoot ? "hidden layout-account-xs:block" : ""}
          `}
        >
          {children}
        </div>

      </div>
    </main>
  );
}