"use client";

import { AuthInput } from "@/components/AuthInput";
import { AuthCheckbox } from "@/components/AuthCheckbox";
import { AuthCard } from "@/components/AuthCard";
import type { SubmitEventHandler } from "react";
import { validateSignUpForm } from "@/lib/validation/auth";

export default function SignUpPage() {
  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const firstName = formData.get("firstName")?.toString().trim() || "";
    const lastName = formData.get("lastName")?.toString().trim() || "";
    const email = formData.get("email")?.toString().trim() || "";
    const password = formData.get("password")?.toString() || "";
    const terms = Boolean(formData.get("terms"));

    const error = validateSignUpForm({
      firstName,
      lastName,
      email,
      password,
      terms,
    });

    if (error) {
      console.error(error);
      return;
    }

    console.log("Form submitted");
  };

  return (
    <main className="flex py-[141px] bg-surface-1 items-center justify-center">
      <AuthCard title="Sign up" buttonText="Sign up" onSubmit={handleSubmit}>
        <AuthInput placeholder="First Name" type="text" name="firstName" />
        <AuthInput placeholder="Last Name" type="text" name="lastName" />
        <AuthInput placeholder="Email" type="text" name="email" />
        <AuthInput placeholder="Password" type="password" name="password" />
        <AuthCheckbox
          name="terms"
          label="I agree with Terms and Service and Privacy Policy"
        />
      </AuthCard>
    </main>
  );
}
