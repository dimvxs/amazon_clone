"use client";

import useSWR from "swr";
import Image from "next/image";

import { useEffect, useRef, useState } from "react";
import { DateInput } from "rsuite";

import { USER_KEY, fetcher } from "@/lib/api/user";
import { normalizeDob, toIsoDate } from "@/lib/utils/dob";
import { useAvatar } from "@/lib/hooks/useAvatar";

import { InputWrapper } from "@/components/InputWrapper";
import { FormInput } from "@/components/FormInput";
import { NameFields } from "@/components/NameFields";
import { PhoneField } from "@/components/PhoneField";

import Avatar from "@/components/Avatar";
import FormButton from "@/components/FormButton";
import EditButton from "@/components/EditButton";

import calendarIcon from "@/assets/icons/calendar_today.svg";
import type { UserData } from "@/lib/types/user";

export default function AccountDetails() {
  const [dob, setDob] = useState<Date | null>(null);

  const {
    file: selectedFile,
    preview,
    fileInputRef,
    onFileChange,
    openFilePicker,
  } = useAvatar();

  const inputRef = useRef<any>(null);
  const { data: userData } = useSWR<UserData>(USER_KEY, fetcher);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    //const data = {
    //  firstName: formData.get("firstName"),
    //  lastName: formData.get("lastName"),
    //  email: formData.get("email"),
    //  password: formData.get("password"),
    //  phone: formData.get("phone"),
    //  dob: toIsoDate(dob),
    //};
    formData.set("dob", toIsoDate(dob) ?? "");
    //console.log("Saved data:", data);
    if (selectedFile) {
        console.log("Avatar file sent:", selectedFile);
        formData.append("image", selectedFile);
        formData.append("changeAvatar", "true");
    } else {
        console.log("No avatar file selected");
        formData.append("changeAvatar", "false");
      }
    const res = await fetch(`http://localhost:5012/api/user/info`, {
      method: "PUT",
      credentials: "include",
      body: formData
    });
  };

  useEffect(() => {
    if (!userData) return;

    setDob(normalizeDob(userData.dob));
  }, [userData]);

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  if (!userData) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-[30px]">
      <div className="flex flex-col gap-[10px]">
        <InputWrapper label="Profile photo">
          <div className="flex gap-[12px] items-center">
            <Avatar src={preview || userData.avatar} />
            <EditButton onClick={openFilePicker} />
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onFileChange}
          />
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
          <div className="bg-input-surface-default flex items-center h-[40px] rounded-[10px] px-[15px]">
            <DateInput
              value={dob}
              onChange={setDob}
              placeholder="Select date"
              format="MM/dd/yyyy"
              className="flex-1 min-w-0 bg-transparent outline-none text-input text-[14px] leading-[13px]"
            />
            <button
              type="button"
              className="h-full flex items-center cursor-pointer shrink-0 ml-2"
              onClick={() => inputRef.current?.open?.()}
            >
              <Image src={calendarIcon} alt="Calendar" width={14} height={16} />
            </button>
          </div>
        </InputWrapper>
      </div>

      <FormButton type="submit">Save</FormButton>
    </form>
  );
}
