import { InputWrapper } from "@/components/InputWrapper";
import { FormInput } from "@/components/FormInput";

interface NameFieldsProps {
  firstName?: string;
  lastName?: string;
  stackOnMobile?: boolean;
}

export function NameFields({
  firstName,
  lastName,
  stackOnMobile = false,
}: NameFieldsProps) {
  return (
    <div
      className={`flex ${
        stackOnMobile
          ? "sm:flex-row flex-col sm:gap-[28px]"
          : "flex-row gap-[28px]"
      }`}
    >
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