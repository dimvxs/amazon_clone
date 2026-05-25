"use client";

import { Button } from "@/components/Button";
import { useRouter } from "next/navigation";

export default function EmailConfirmationPage() {
  const router = useRouter();

  return (
    <div className="w-full items-center flex flex-col gap-[50px] layout-px pt-[clamp(80px,15vw,200px)] pb-[80px]">
      <h2 className="text-main font-semibold text-[40px] leading-[44px] text-center text-white">
        Email Confirmation
      </h2>
      <div className="size-[clamp(100px,20vw,150px)] text-accent-muted">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          className="h-full w-full"
          fill="none"
        >
          <defs>
            <mask id="check-cutout">
              <rect width="100" height="100" fill="white" />

              <path
                d="M30 52L45 67L72 38"
                fill="none"
                stroke="black"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </mask>
          </defs>
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="currentColor"
            mask="url(#check-cutout)"
          />
        </svg>
      </div>
      <p className="font-normal text-[18px] leading-[24px] text-center text-main/80 max-w-[450px]">
        Congratulations! Your email has been successfully confirmed. You can now
        login to the applicaiton.
      </p>

      <Button
        variant="primary"
        hoverVariant="accent_muted"
        py={10}
        onClick={() => router.push("/login")}
      >
        Go to Login
      </Button>
    </div>
  );
}
