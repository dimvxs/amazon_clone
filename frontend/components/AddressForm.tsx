"use client";

import { InputWrapper } from "@/components/InputWrapper";
import { FormInput } from "@/components/FormInput";
import { NameFields } from "@/components/NameFields";
import { PhoneField } from "@/components/PhoneField";
import FormButton from "@/components/FormButton";

import Image from "next/image";
import flagRomania from "@/assets/img/flag-romania.png";

type AddressFormProps = {
  defaultValues?: any;
  onSubmit: (data: any) => Promise<void> | void;
  submitLabel?: string;
};

export default function AddressForm({
  defaultValues,
  onSubmit,
  submitLabel = "Save",
}: AddressFormProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      phone: formData.get("phone"),
      street: formData.get("street"),
      houseNumber: formData.get("houseNumber"),
      city: formData.get("city"),
      state: formData.get("state"),
      postalCode: formData.get("postalCode"),
      country: formData.get("country"),
    };

    await onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-[30px]">
      <div className="flex flex-col gap-[10px]">
        <NameFields
          firstName={defaultValues?.firstName}
          lastName={defaultValues?.lastName}
        />

        <PhoneField phone={defaultValues?.phone} />

        <InputWrapper label="Address" className="gap-[5px]">
          <div className="flex gap-[4px]">
            <FormInput
              name="street"
              placeholder="Street"
              defaultValue={defaultValues?.address?.street}
            />
            <FormInput
              name="houseNumber"
              placeholder="House"
              defaultValue={defaultValues?.address?.houseNumber}
            />
          </div>

          <div className="flex gap-[4px]">
            <FormInput
              name="city"
              placeholder="City"
              defaultValue={defaultValues?.address?.city}
            />
            <FormInput
              name="state"
              placeholder="State"
              defaultValue={defaultValues?.address?.state}
            />
            <FormInput
              name="postalCode"
              placeholder="Postal code"
              defaultValue={defaultValues?.address?.postalCode}
            />
          </div>
        </InputWrapper>

        <InputWrapper className="max-w-[200px]" label="Country">
          <div className="w-full h-[40px] bg-input-surface-default flex items-center rounded-[10px]">
            <button
              type="button"
              className="h-full flex items-center pl-[15px] gap-[6px]"
            >
              <Image
                src={flagRomania}
                alt="Romania Flag"
                width={30}
                height={16}
                className="rounded-[2px] object-cover mr-[3px]"
              />
            </button>

            <FormInput
              className="h-full pl-[4px] flex-1"
              defaultValue={defaultValues?.address?.country}
              name="country"
            />

            <button
              type="button"
              className="h-full flex items-center pr-[15px]"
            >
              <span className="rotate-90 text-[13px]">›</span>
            </button>
          </div>
        </InputWrapper>
      </div>

      <FormButton type="submit">{submitLabel}</FormButton>
    </form>
  );
}
