"use client";

import { InputWrapper } from "@/components/InputWrapper";
import { FormInput } from "@/components/FormInput";

import flag from "@/assets/img/flag-us.png";
import flagRomania from "@/assets/img/flag-romania.png";

import Image from "next/image";

const userData = {
  firstName: "Sasha",
  lastName: "Hordiiuk",
  phone: "123456789",
  street: "",
  houseNumber: "",
  city: "",
  state: "",
  postalCode: "",
  country: "Romania",
};

export default function AccountAddresses() {
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = {
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
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-[30px]">
      <div className="flex flex-col gap-[10px]">
        <div className="flex flex-col layout-account-sm:gap-[28px] layout-account-sm:flex-row">
          <InputWrapper
            className="w-full layout-account-sm:max-w-[200px]"
            label="First name"
          >
            <FormInput name="firstName" defaultValue={userData.firstName} />
          </InputWrapper>

          <InputWrapper
            className="w-full layout-account-sm:max-w-[200px]"
            label="Last name"
          >
            <FormInput name="lastName" defaultValue={userData.lastName} />
          </InputWrapper>
        </div>

        <InputWrapper label="Phone number">
          <div className="w-full h-[40px] bg-white flex items-center rounded-[10px]">
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
              <span className="inline-block rotate-90 font-[Inter] font-normal text-[13px] leading-[14px] align-middle text-default text-center">
                ›
              </span>
              <span className="text-default text-[14px] leading-[13px] align-middle">
                +1
              </span>
            </button>
            <FormInput
              className="h-full pl-[4px] flex-1"
              defaultValue={userData.phone}
              name="phone"
            />
          </div>
        </InputWrapper>

        
        <InputWrapper label="Phone number" className="gap-[5px]">
          <div className="flex gap-[4px]">
            <FormInput name="street" placeholder="Street" defaultValue={userData.street}/>
            <FormInput name="houseNumber" placeholder="House" defaultValue={userData.houseNumber} />
          </div>

          <div className="flex gap-[4px]">
            <FormInput name="city" placeholder="City" defaultValue={userData.city}/>
            <FormInput name="state" placeholder="State" defaultValue={userData.state}/>
            <FormInput name="postalCode" placeholder="Postal code" defaultValue={userData.postalCode}/>
          </div>
        </InputWrapper>

        <InputWrapper className="max-w-[200px]" label="Country">
          <div className="w-full h-[40px] bg-white flex items-center rounded-[10px]">
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
              defaultValue={"Romania"}
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

      <button
        type="submit"
        className="rounded-[20px] px-[34px] py-[10px] text-[20px] leading-[100%] align-middle bg-blue-500 w-fit cursor-pointer"
      >
        Save
      </button>
    </form>
  );
}
