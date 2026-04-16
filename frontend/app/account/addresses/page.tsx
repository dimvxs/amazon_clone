"use client";
import useSWR from "swr";
import { USER_KEY, fetcher } from "@/lib/api/user";

import { InputWrapper } from "@/components/InputWrapper";
import { FormInput } from "@/components/FormInput";

import flagRomania from "@/assets/img/flag-romania.png";

import Image from "next/image";
import { NameFields } from "@/components/NameFields";
import { PhoneField } from "@/components/PhoneField";
import FormButton from "@/components/FormButton";

export default function AccountAddresses() {
  const { data: userData } = useSWR(USER_KEY, fetcher);
    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    
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
    console.log("Saved data:", data);
  };

  if (!userData) return <div>Loading...</div>;
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-[30px]">
      <div className="flex flex-col gap-[10px]">
        <NameFields
          firstName={userData.firstName}
          lastName={userData.lastName}
        />
        <PhoneField phone={userData.phone} />
        <InputWrapper label="Address" className="gap-[5px]">
          <div className="flex gap-[4px]">
            <FormInput
              name="street"
              placeholder="Street"
              defaultValue={userData.address.street}
            />
            <FormInput
              name="houseNumber"
              placeholder="House"
              defaultValue={userData.address.houseNumber}
            />
          </div>

          <div className="flex gap-[4px]">
            <FormInput
              name="city"
              placeholder="City"
              defaultValue={userData.address.city}
            />
            <FormInput
              name="state"
              placeholder="State"
              defaultValue={userData.address.state}
            />
            <FormInput
              name="postalCode"
              placeholder="Postal code"
              defaultValue={userData.address.postalCode}
            />
          </div>
        </InputWrapper>
        <InputWrapper className="max-w-[200px]" label="Country">
          <div className="w-full h-[40px] bg-input-surface-default flex items-center rounded-[10px]">
            <button
              type="button"
              className="h-full flex items-center pl-[15px] gap-[6px] cursor-pointer"
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
              defaultValue={userData.address.country}
              name="country"
            />
            <button
              type="button"
              className="h-full flex items-center pr-[15px] cursor-pointer"
            >
              <span className="inline-block rotate-90 font-[Inter] font-normal text-[13px] leading-[14px] align-middle text-default text-center">
                ›
              </span>
            </button>
          </div>
        </InputWrapper>
      </div>

      <FormButton type="submit">Save</FormButton>
    </form>
  );
}
