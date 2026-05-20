"use client";

import { AuthInput } from "@/components/AuthInput";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/Checkbox";
import { AuthCard } from "@/components/AuthCard";

import { loginSchema, LoginValues } from "@/lib/validation/login.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function LogInPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      terms: false,
    },
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
        const message = await response.text();

        setError("password", {
          message,
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
          {...register("password")}
        />
        <Checkbox
          label="I agree with Terms and Service and Privacy Policy"
          labelClassName="text-[11px] leading-none"
          error={errors.terms?.message}
          checked={watch("terms")}
          {...register("terms")}
        />
      </AuthCard>
    </div>
  );
}
