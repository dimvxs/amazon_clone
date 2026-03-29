"use client";
import Image from "next/image";

import { InputWrapper } from "@/components/InputWrapper";
import { FormInput } from "@/components/FormInput";
import { NameFields } from "@/components/NameFields";
import { PhoneField } from "@/components/PhoneField";
import Avatar from "@/components/Avatar";

import calendarIcon from "@/assets/icons/calendar_today.svg";
import editIcon from "@/assets/icons/edit.svg";
import FormButton from "@/components/FormButton";

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
        <InputWrapper label="Profile photo">
          <div className="flex gap-[12px]">
            <Avatar />
            <button
              type="button"
              className="flex items-center gap-[10px] cursor-pointer"
            >
              <Image src={editIcon} alt="Edit" width={18} height={18} />
              <span className="font-semibold text-[16px] leading-[32px] align-middle text-accent">
                Edit
              </span>
            </button>
          </div>
        </InputWrapper>
        <NameFields
          firstName={userData.firstName}
          lastName={userData.lastName}
        />
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
        <PhoneField phone={userData.phone} />
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
      <FormButton type="submit">Save</FormButton>
    </form>
  );
}
