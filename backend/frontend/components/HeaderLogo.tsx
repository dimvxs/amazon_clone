"use client";

import Image from "next/image";
import Link from "next/link";

import logo from "@/assets/icons/placeholder.svg";

export default function HeaderLogo() {
  return (
    <Link
      href="/"
      className="w-[98px] h-[34px] bg-surface-3 flex-shrink-0 mr-3 layout-sm:mr-0 relative block"
    >
      <Image
        src={logo}
        alt="Logo"
        fill
        className="object-contain"
        priority
      />
    </Link>
  );
}