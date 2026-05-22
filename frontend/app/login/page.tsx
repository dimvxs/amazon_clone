"use client";

import { AuthInput } from "@/components/AuthInput";
import { useRouter } from "next/navigation";
import { AuthCard } from "@/components/AuthCard";

import { loginSchema, LoginValues } from "@/lib/validation/login.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuthStore } from "@/lib/stores/auth-store";

export default function LogInPage() {
  const router = useRouter();
  const setEmail = useAuthStore((s) => s.setEmail);
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
  });

  const handleValidSubmit = async (data: LoginValues) => {
    const loginDTO = {
      email: data.email,
      password: data.password,
    };
    try {
      const response = await fetch("http://localhost:5012/api/user/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginDTO),
      });
      if (!response.ok) {
        setError("password", {
          type: "forgot-password",
          message: "Forgot your password?",
        });
        return;
      }
      router.push("/account");
    } catch (err) {
      console.error("Error connecting to server:", err);
    }
  };
  return (
    <div className="flex items-center justify-center">
      <AuthCard
        buttonText="Log in"
        onSubmit={handleSubmit(handleValidSubmit)}
        title="login"
      >
        <AuthInput
          placeholder="Email"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <AuthInput
          placeholder="Password"
          type="password"
          autoComplete="current-password"
          error={errors.password?.message}
          errorType={errors.password?.type}
          onErrorClick={() => {
            setEmail(getValues("email"));
            router.push("/forgot-password");
          }}
          {...register("password")}
        />
      </AuthCard>
    </div>
  );
}
