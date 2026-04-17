"use client";

import { AuthInput } from "@/components/AuthInput";
import { useRouter } from 'next/navigation';
import { AuthCheckbox } from "@/components/AuthCheckbox";
import { AuthCard } from "@/components/AuthCard";
import type { SubmitEventHandler } from "react";
import { validateLoginForm } from "@/lib/validation/auth";

export default function LogInPage() {
  const router = useRouter();
  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const email = formData.get("email")?.toString().trim() || "";
    const password = formData.get("password")?.toString() || "";
    const terms = formData.get("terms");

    const error = validateLoginForm({
      email,
      password,
      terms: Boolean(terms),
    });

    if (error) {
      console.error(error);
      return;
    }

    // Создаём DTO для отправки на backend
    const loginDTO = { email, password };

    try {
      const response = await fetch("http://localhost:5012/api/user/login", {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginDTO),
      });

      console.log("Status:", response.status, "OK?", response.ok);

      
      
      if (!response.ok) {
        const message = await response.text();
        console.error("Login failed:", message);
        return;
      }

      const data = await response.text();
      console.log("Login success:", data);
        // сделать редирект
        router.push('/account');
    } catch (err) {
      console.error("Error connecting to server:", err);
    }
  };

  return (
      <div className="flex items-center justify-center">
        <AuthCard buttonText="Log in" onSubmit={handleSubmit} title="login">
          <AuthInput placeholder="Email" type="text" name="email" autoComplete="email"/>
          <AuthInput placeholder="Password" type="password" name="password" autoComplete="current-password"/>
          <AuthCheckbox
              name="terms"
              label="I agree with Terms and Service and Privacy Policy"
          />
        </AuthCard>
      </div>
  );
}