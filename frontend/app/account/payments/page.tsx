"use client";

import CardNumberIcon from "@/assets/icons/credit_card_payment.svg?react";
import { PaymentInput } from "@/components/PaymentInput";
import PaymentOptions from "@/components/PaymentOptions";
import PaymentBenefits from "@/components/PaymentBenefits";
import FormButton from "@/components/FormButton";
import { AuthCheckbox } from "@/components/AuthCheckbox";

export default function AccountPayments() {
  return (
    <div className="flex flex-col sm:flex-row w-full justify-between items-start sm:items-center gap-[30px]">
      <div className="flex flex-col w-full sm:w-[510px] gap-[20px] items-start ">
        <PaymentOptions />
        <div className="flex flex-col w-full gap-[10px]">
          <PaymentInput
            label="Card number"
            placeholder="Card number"
            Icon={CardNumberIcon}
          />
          <PaymentInput
            label="Name on card"
            placeholder="Name Surname"
            Icon={CardNumberIcon}
          />

          <div className="flex gap-[4px]">
            <PaymentInput
              label="Expiration date"
              placeholder="01/29"
              Icon={CardNumberIcon}
            />
            <PaymentInput label="CVV" placeholder="123" Icon={CardNumberIcon} />
          </div>
        </div>
        <AuthCheckbox name="check" label="Set as default" />
        <FormButton type="submit">Save Card</FormButton>
      </div>
      <PaymentBenefits />
    </div>
  );
}
