"use client";

import { AuthInput } from "@/components/AuthInput";
import { AuthCard } from "@/components/AuthCard";

import {
  resetPasswordSchema,
  ResetPasswordValues,
} from "@/lib/validation/reset-password.schema";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

export default function ResetPasswordPage() {
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const handleValidSubmit = async (data: ResetPasswordValues) => {
    setError("");

    try {
      console.log("password:", data.password);
      console.log("full payload:", data);
    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center">
      <AuthCard
        buttonText="Reset"
        onSubmit={handleSubmit(handleValidSubmit)}
        title="reset-password"
      >
        <div className="flex flex-col gap-4">
          <AuthInput
            placeholder="Password"
            type="password"
            autoComplete="new-password"
            error={errors.password?.message}
            {...register("password")}
          />

          <AuthInput
            placeholder="Confirm Password"
            type="password"
            autoComplete="new-password"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />

          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
      </AuthCard>
    </div>
  );
}
