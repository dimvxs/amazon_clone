import { InputWrapper } from "@/components/InputWrapper";
import { FormInput } from "@/components/FormInput";

interface NameFieldsProps {
  firstName?: string;
  lastName?: string;
}

export function NameFields({ firstName, lastName }: NameFieldsProps) {
  return (
    <div className="flex flex-col layout-account-sm:gap-[28px] layout-account-sm:flex-row">
      <InputWrapper
        className="w-full layout-account-sm:max-w-[200px]"
        label="First name"
      >
        <FormInput name="firstName" defaultValue={firstName} />
      </InputWrapper>

      <InputWrapper
        className="w-full layout-account-sm:max-w-[200px]"
        label="Last name"
      >
        <FormInput name="lastName" defaultValue={lastName} />
      </InputWrapper>
    </div>
  );
}