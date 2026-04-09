"use client";
import { useState, useEffect } from "react";
import { FormInput } from "@/components/FormInput";
import calendarIcon from "@/assets/icons/arrow-back.svg";
import { InputButton } from "@/components/InputButton";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Order = {
  id: number;
  title: string;
  price: number;
  image: string;
};

export default function AccountOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const router = useRouter();

  useEffect(() => {
    fetch("/data/orders.json")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Failed to load orders:", err));
  }, []);

  const visibleCards = orders.slice(0, visibleCount);

  if (!orders.length) {
    return <div>Loading...</div>;
  }
  
  return (
    <>
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
          {visibleCards.map((order) => (
            <div
              key={order.id}
              onClick={() => router.push(`/account/orders/${order.id}`)}
              className="cursor-pointer w-full bg-white rounded-[10px] overflow-hidden flex flex-col"
            >
              <div className="aspect-[241/204] w-full relative bg-gray-300">
                <Image
                  src={order.image}
                  alt={order.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-[10px] flex flex-col gap-[6px] text-default">
                <p className="text-[14px] leading-[20px] line-clamp-2">
                  {order.title}
                </p>
                <p className="flex items-start font-sans">
                  <span className="text-[28px] leading-[100%] font-normal">
                    ${order.price}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {visibleCount < orders.length && (
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
    </>
  );
}
