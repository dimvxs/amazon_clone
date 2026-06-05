"use client";

import Link from "next/link";
import Image from "next/image";
import defaultAvatar from "@/assets/icons/avatar.svg"; 

interface HeaderUserBtnProps {
  isLoggedIn: boolean;
  userAvatar?: string;
}

export default function HeaderUserBtn({ isLoggedIn, userAvatar }: HeaderUserBtnProps) {
  return (
    <Link 
      href={isLoggedIn ? "/account" : "/login"} 
      className="flex items-center text-light cursor-pointer w-auto layout-xs:w-[92px]"
    >
      {/* Аватарка (дефолтная или загруженная юзером) */}
      <div className="relative w-6 h-6 min-w-[24px] min-h-[24px] flex-shrink-0">
        {isLoggedIn && userAvatar ? (
          <div className="w-full h-full rounded-full overflow-hidden relative">
            <Image 
              src={userAvatar} 
              alt="User Avatar" 
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <Image 
            src={defaultAvatar} 
            alt="Default Avatar" 
            width={24} 
            height={24} 
            className="object-contain block w-full h-full"
          />
        )}
      </div>

      {/* Динамический текст в зависимости от статуса авторизации */}
      <div className="ml-2 hidden layout-xs:block">
        {isLoggedIn ? (
          <div className="flex flex-col text-left font-[400] text-[12px] leading-[14px] text-light">
            <span>Your</span>
            <span className="font-[700] text-[14px] leading-[16px] underline decoration-1">Account</span>
          </div>
        ) : (
          <span className="font-[700] text-[13px] leading-[18px] whitespace-nowrap">
            Sign in / Register
          </span>
        )}
      </div>
    </Link>
  );
}