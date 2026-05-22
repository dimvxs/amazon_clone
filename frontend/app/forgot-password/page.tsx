"use client";

import { AuthInput } from "@/components/AuthInput";
import { AuthCard } from "@/components/AuthCard";

import {
  forgotPasswordSchema,
  ForgotPasswordValues,
} from "@/lib/validation/forgot-password.schema";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [sentEmail, setSentEmail] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const handleValidSubmit = async (data: ForgotPasswordValues) => {
    console.log("Forgot password email:", data.email);

    setSentEmail(data.email);
  };

  return (
    <div className="flex items-center justify-center">
      <AuthCard
        buttonText="Send to Email"
        onSubmit={handleSubmit(handleValidSubmit)}
        title="forgot-password"
      >
        <AuthInput
          placeholder="Email"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />
        {sentEmail && (
          <span className="text-sm text-surface-accent-muted">
            Reset link sent to {sentEmail} ✓
          </span>
        )}
      </AuthCard>
    </div>
  );
}
