"use client";

import { AuthInput } from "@/components/AuthInput";
import { AuthCheckbox } from "@/components/AuthCheckbox";
import { AuthCard } from "@/components/AuthCard";
import type { SubmitEventHandler } from "react";
import { validateSignUpForm } from "@/lib/validation/auth";

export default function SignUpPage() {
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
        return;
      }

      const data = await response.json();
      console.log("User registered:", data);
    } catch (err) {
      console.error("Request failed:", err);
    }
  };
  return (
    <main className="flex py-[141px] bg-surface-1 items-center justify-center">
      <AuthCard title="Sign up" buttonText="Sign up" onSubmit={handleSubmit}>
        <AuthInput
          placeholder="First Name"
          type="text"
          name="firstName"
          autoComplete="first-name"
        />
        <AuthInput
          placeholder="Last Name"
          type="text"
          name="lastName"
          autoComplete="last-name"
        />
        <AuthInput
          placeholder="Email"
          type="text"
          name="email"
          autoComplete="email"
        />
        <AuthInput
          placeholder="Password"
          type="password"
          name="password"
          autoComplete="new-password"
        />
        <AuthCheckbox
          name="terms"
          label="I agree with Terms and Service and Privacy Policy"
        />
      </AuthCard>
    </main>
  );
}
