"use client";

import { InputWrapper } from "@/components/InputWrapper";
import { FormInput } from "@/components/FormInput";

import flag from "@/assets/img/flag-us.png";
import calendarIcon from "@/assets/icons/calendar_today.svg";

import Image from "next/image";

const userData = {
  firstName: "Sasha",
  lastName: "Hordiiuk",
  email: "spinjitsumaster@gmail.com",
  password: "randompassword",
  phone: "123456789",
  dob: "02/03/2005",
};

export default function AccountDetails() {
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      password: formData.get("password"),
      phone: formData.get("phone"),
      dob: formData.get("dob"),
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

        <InputWrapper label="Email">
          <FormInput name="email" defaultValue={userData.email} />
        </InputWrapper>

        <InputWrapper label="Password">
          <FormInput
            name="password"
            type="password"
            defaultValue={userData.password}
          />
        </InputWrapper>

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

        <InputWrapper className="max-w-[200px]" label="Date of Birth">
          <div className="bg-white flex items-center h-[40px] rounded-[10px]">
            <FormInput
              name="dob"
              className="h-full"
              defaultValue={userData.dob}
            />
            <button
              type="button"
              className="h-full flex items-center pr-[12px] cursor-pointer"
            >
              <Image
                src={calendarIcon}
                alt="Calendar"
                width={14}
                height={16}
                className="object-contain"
              />
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
