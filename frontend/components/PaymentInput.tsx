"use client";

import { FormInput } from "@/components/FormInput";
import { InputWrapper } from "@/components/InputWrapper";
import type { ComponentType, SVGProps } from "react";

type PaymentInputProps = {
  label: string;
  name: string;
  placeholder?: string;
  defaultValue?: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export function PaymentInput({
  label,
  placeholder,
  name,
  Icon,
}: PaymentInputProps) {
  return (
    <InputWrapper label={label} className="w-full">
      <div className="w-full h-[40px] bg-input-surface-default flex items-center rounded-[10px] px-[16px] gap-[6px]">
        <Icon className="shrink-0" />
        <FormInput name={name} placeholder={placeholder} className="!p-0 w-full" />
      </div>
    </InputWrapper>
  );
}