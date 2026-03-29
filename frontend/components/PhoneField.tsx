import { InputWrapper } from "@/components/InputWrapper";
import { FormInput } from "@/components/FormInput";
import Image from "next/image";

import flag from "@/assets/img/flag-us.png";

interface PhoneFieldProps {
  phone?: string;
}

export function PhoneField({ phone }: PhoneFieldProps) {
  return (
    <InputWrapper label="Phone number">
      <div className="w-full h-[40px] bg-input-surface-default flex items-center rounded-[10px] text-default">
        <button
          type="button"
          className="h-full flex items-center pl-[15px] gap-[6px] cursor-pointer"
        >
          <Image
            src={flag}
            alt="US flag"
            width={30}
            height={16}
            className="rounded-[2px] object-cover mr-[3px]"
          />
          <span className="inline-block rotate-90 font-normal text-[15px] leading-[14px]">
            ›
          </span>
          <span className="text-[14px] leading-[13px]">+1</span>
        </button>

        <FormInput
          className="h-full pl-[4px] flex-1"
          defaultValue={phone}
          name="phone"
        />
      </div>
    </InputWrapper>
  );
}