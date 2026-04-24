"use client";

import CardNumberIcon from "@/assets/icons/credit_card_payment.svg?react";
import ExpirationIcon from "@/assets/icons/calendar_month.svg?react";
import CardNameIcon from "@/assets/icons/id_card.svg?react";
import CvvIcon from "@/assets/icons/lock.svg?react";

import { PaymentInput } from "@/components/PaymentInput";
import { Checkbox } from "@/components/Checkbox";
import { PaymentData } from "@/lib/api/payment";
import PaymentOptions from "@/components/PaymentOptions";
import FormButton from "@/components/FormButton";


interface PaymentFormProps {
  onSubmit: (data: PaymentData) => void;
  submitLabel?: string;
  disableCheckbox?: boolean;
}

export default function PaymentForm({
  onSubmit,
  submitLabel = "Save Card",
  disableCheckbox = false,
}: PaymentFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    onSubmit({
      cardNumber: String(formData.get("cardNumber") || ""),
      nameOnCard: String(formData.get("nameOnCard") || ""),
      expiryDate: String(formData.get("expiryDate") || ""),
      cvv: String(formData.get("cvv") || ""),
      saveCard: formData.get("setDefault") === "on",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full  gap-[20px] items-start"
    >
      <PaymentOptions />

      <div className="flex flex-col w-full gap-[10px]">
        <PaymentInput
          label="Card number"
          placeholder="Card number"
          Icon={CardNumberIcon}
          name="cardNumber"
        />

        <PaymentInput
          label="Name on card"
          placeholder="Name Surname"
          Icon={CardNameIcon}
          name="nameOnCard"
        />

        <div className="flex gap-[4px]">
          <PaymentInput
            label="Expiration date"
            placeholder="01/29"
            Icon={ExpirationIcon}
            name="expiryDate"
          />

          <PaymentInput
            label="CVV"
            placeholder="123"
            Icon={CvvIcon}
            name="cvv"
          />
        </div>
      </div>

      {!disableCheckbox && (
        <Checkbox
          label="Set as default"
          name="setDefault"
          labelClassName="text-[14px] font-medium"
        />
      )}

      <FormButton type="submit">{submitLabel}</FormButton>
    </form>
  );
}