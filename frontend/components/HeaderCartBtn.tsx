"use client";

import Link from "next/link";
import Image from "next/image";
import cartIcon from "@/assets/icons/shopping_cart.svg"; 
import cartCounterIcon from "@/assets/icons/cart_amount.svg"; 

interface HeaderCartBtnProps {
  isLoggedIn: boolean;
  cartCount: number;
}

export default function HeaderCartBtn({ isLoggedIn, cartCount }: HeaderCartBtnProps) {
  const showBadge = isLoggedIn && cartCount > 0;

  return (
    <Link href="/cart" className="flex items-center cursor-pointer">
      <div className="relative w-6 h-6 min-w-[24px] min-h-[24px] flex-shrink-0">
        <Image 
          src={cartIcon} 
          alt="Cart" 
          width={24} 
          height={24} 
          className="object-contain block w-full h-full"
        />

        {/* Синий бейдж количества товаров */}
        {showBadge && (
          <div className="absolute top-0 right-0 w-[18px] h-[18px] z-10 translate-x-[30%] -translate-y-[30%] flex items-center justify-center">
            <Image 
              src={cartCounterIcon} 
              alt="Count background" 
              fill
              className="object-contain"
              priority
            />
            <span className="absolute inset-0 flex items-center justify-center text-[10px] text-white font-bold leading-none select-none pb-[1px]">
              {cartCount}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}