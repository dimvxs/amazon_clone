"use client";

import CardNumberIcon from "@/assets/icons/credit_card_payment.svg?react";
import { PaymentInput } from "@/components/PaymentInput";
import PaymentOptions from "@/components/PaymentOptions";
import PaymentBenefits from "@/components/PaymentBenefits";
import FormButton from "@/components/FormButton";
import { Checkbox } from "@/components/Checkbox";

export default function AccountPayments() {
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      cardNumber: formData.get("cardNumber"),
      nameOnCard: formData.get("nameOnCard"),
      expiryDate: formData.get("expiryDate"),
      cvv: formData.get("cvv"),
      saveCard: formData.get("saveCard") === "on",
    };
    console.log("Form:", data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row w-full justify-between items-start sm:items-center gap-[30px]"
    >
      <div className="flex flex-col w-full sm:w-[510px] gap-[20px] items-start">
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
            Icon={CardNumberIcon}
            name="nameOnCard"
          />

          <div className="flex gap-[4px]">
            <PaymentInput
              label="Expiration date"
              placeholder="01/29"
              Icon={CardNumberIcon}
              name="expiryDate"
            />

            <PaymentInput
              label="CVV"
              placeholder="123"
              Icon={CardNumberIcon}
              name="cvv"
            />
          </div>
        </div>

        <Checkbox
          label="Save card"
          name="saveCard"
          labelClassName="text-[14px] font-medium"
        />

        <FormButton type="submit">Save Card</FormButton>
      </div>
      <PaymentBenefits />
    </form>
  );
}