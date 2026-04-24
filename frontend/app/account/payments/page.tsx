"use client";
import PaymentForm from "@/components/PaymentForm";
import PaymentBenefits from "@/components/PaymentBenefits";

export default function PaymentStep() {
  return (
    <div className="flex flex-col sm:flex-row w-full justify-between items-start sm:items-center gap-[30px]">
      <div className="flex sm:w-[510px]">
      <PaymentForm
        onSubmit={(data) => console.log("Payment:", data)}
        disableCheckbox={true}
        submitLabel="Use this card"
      />
      </div>
      <PaymentBenefits />
    </div>
  );
}