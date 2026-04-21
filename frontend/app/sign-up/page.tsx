"use client";

import { AuthInput } from "@/components/AuthInput";
import { Checkbox } from "@/components/Checkbox";
import { AuthCard } from "@/components/AuthCard";
import type { SubmitEventHandler } from "react";
import { validateSignUpForm } from "@/lib/validation/auth";
import { useState } from "react";

export default function SignUpPage() {
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    terms?: string;
  }>({});

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    // --- Фронтенд: отдельные поля для удобства пользователя ---
    const firstName = formData.get("firstName")?.toString().trim() || "";
    const lastName = formData.get("lastName")?.toString().trim() || "";
    const email = formData.get("email")?.toString().trim() || "";
    const password = formData.get("password")?.toString() || "";
    const terms = Boolean(formData.get("terms"));

    // --- Валидация на фронтенде ---
    const validationErrors = validateSignUpForm({
      firstName,
      lastName,
      email,
      password,
      terms,
    });

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    // --- Объединяем имя и фамилию в одно поле для бэкенда ---
    const fullName = `${firstName} ${lastName}`.trim();

    try {
      const response = await fetch("http://localhost:5012/api/user/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName, // <- совпадает с DTO на сервере
          email, // <- совпадает с DTO на сервере
          password, // <- совпадает с DTO на сервере
        }),
      });
      if (!response.ok) {
        const err = await response.text();
        console.error("Server error:", err);
        setErrors({
          email: err,
        });
        return;
      }
      const data = await response.json();
      console.log("User registered:", data);
    } catch (err) {
      console.error("Request failed:", err);
    }
  };
  return (
    <div className="flex items-center justify-center">
      <AuthCard buttonText="Sign up" onSubmit={handleSubmit} title="signup">
        <AuthInput
          placeholder="First Name"
          type="text"
          name="firstName"
          autoComplete="given-name"
          error={errors.firstName}
        />

        <AuthInput
          placeholder="Last Name"
          type="text"
          name="lastName"
          autoComplete="family-name"
          error={errors.lastName}
        />

        <AuthInput
          placeholder="Email"
          type="text"
          name="email"
          autoComplete="email"
          error={errors.email}
        />

        <AuthInput
          placeholder="Password"
          type="password"
          name="password"
          autoComplete="new-password"
          error={errors.password}
        />
        <Checkbox
          name="terms"
          label="I agree with Terms and Service and Privacy Policy"
          labelClassName="text-[11px] leading-none"
          error={errors.terms}
        />
      </AuthCard>
    </div>
  );
}
