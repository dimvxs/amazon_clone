"use client";

import AccountNavigation from "@/components/AccountNavigation";
import { usePathname } from "next/navigation";
import { accountNavigationLinks } from "@/components/AccountNavigation";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isRoot = pathname === "/account";
  const currentLink = accountNavigationLinks.find((link) =>
    pathname.startsWith(link.href),
  );

  const pageTitle = currentLink?.label;

  return (
    <main className="w-full flex justify-center flex-col items-center bg-page-default py-[100px]">
      <div className="w-full max-w-[1528px] flex flex-col layout-account-sm:flex-row items-start justify-between layout-account-sm:gap-[30px] gap-[20px]">
        <div
          className={`
            w-full gap-[30px] flex flex-col
            layout-account-sm:min-w-[280px] layout-account-sm:w-[373px] 
            ${!isRoot ? "hidden layout-account-xs:block" : ""}
          `}
        >
          <AccountNavigation />
        </div>
        <div
          className={`
              w-full flex flex-col 
              layout-account-sm:w-[1082px]
              ${isRoot ? "hidden layout-account-xs:block" : ""}
            `}
        >
          <h1 className="text-default font-semibold text-[24px] leading-[28px] align-middle mb-[20px]">
            {pageTitle}
          </h1>
          <div
            className="bg-gray-600 px-[10px] py-[26px] gap-[12px]
              layout-account-xs:px-[40px] "
          >
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
