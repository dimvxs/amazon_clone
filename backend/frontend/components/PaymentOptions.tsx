"use client";

import Image from "next/image";
import imgVisa from "@/assets/img/payment-visa.png";
import imgAmericanExpress from "@/assets/img/payment-american-express.png";
import imgPayPal from "@/assets/img/payment-paypal.png";
import imgMastercard from "@/assets/img/payment-mastercard.png";



export default function PaymentOptions() {
  const paymentOptions = [
    { src: imgVisa, alt: "Visa" },
    { src: imgMastercard, alt: "Mastercard" },
    { src: imgPayPal, alt: "PayPal" },
    { src: imgAmericanExpress, alt: "American Express" },
  ];

  return (
    <div className="flex gap-[8px]">
      {paymentOptions.map((item, index) => (
        <PaymentOption key={index} src={item.src} alt={item.alt} />
      ))}
    </div>
  );
}
function PaymentOption({ src, alt }: { src: any; alt: string }) {
  return (
    <div className="w-[57px] h-[32px] rounded-[4px] overflow-hidden bg-gray-200 flex items-center justify-center border">
      <Image src={src} alt={alt} />
    </div>
  );
}