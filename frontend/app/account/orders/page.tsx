"use client";
import { useState } from "react";
import { FormInput } from "@/components/FormInput";
import calendarIcon from "@/assets/icons/arrow-back.svg";
import { InputButton } from "@/components/InputButton";
import Image from "next/image";

export default function AccountOrders() {
  const [visibleCount, setVisibleCount] = useState(8);

  const cards = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
  }));

  const visibleCards = cards.slice(0, visibleCount);

  return (
    <form>
      <div className="flex flex-col gap-[26px]">
        <div className="flex gap-[10px]">
          <FormInput
            name="firstName"
            defaultValue={"Search Your Orders"}
            className="layout-account-sm:min-w-[200px]"
          />
          <InputButton
            label="Filter"
            value="Filter"
            className="max-w-[200px]"
            icon={
              <Image
                src={calendarIcon}
                alt="Arrow Down"
                width={14}
                height={16}
                className="object-contain"
              />
            }
            onClick={() => {
              console.log("open dropdown");
            }}
          />
        </div>
        <div
          className="
            grid gap-[26px]
            grid-cols-[repeat(auto-fit,minmax(180px,1fr))]
            xl:grid-cols-4
          "
        >
          {visibleCards.map((card) => (
            <div
              key={card.id}
              className="w-full bg-gray-200 rounded-[10px] overflow-hidden flex flex-col"
            >
              <div className="aspect-[241/204] w-full bg-gray-300 flex items-center justify-center">
                Image
              </div>

              <div className="p-[10px] flex flex-col gap-[6px] text-default">
                <p className="text-[14px] leading-[20px] line-clamp-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </p>
                <p className="flex items-start font-sans">
                  <span className="text-[11.6px] leading-[100%] font-normal self-start">
                    $
                  </span>

                  <span className="text-[28px] leading-[100%] font-normal">
                    1,899.
                  </span>

                  <span className="text-[11.6px] leading-[100%] font-normal self-start">
                    30
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {visibleCount < cards.length && (
          <button
            type="button"
            onClick={() => setVisibleCount((prev) => prev + 4)}
            className="
              self-center cursor-pointer
              font-medium text-[14px] leading-[20px]
              w-[106px] h-[28px]
              rounded-[25px] border
              flex items-center justify-center
            "
          >
            See more
          </button>
        )}
      </div>
    </form>
  );
}
