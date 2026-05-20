import { z } from "zod";

const PASSWORD_MIN = 8;
const PASSWORD_MAX = 20;

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email format"),

  password: z
    .string()
    .min(1, "Password is required")
    .min(
      PASSWORD_MIN,
      `Password must be at least ${PASSWORD_MIN} characters`
    )
    .max(
      PASSWORD_MAX,
      `Maximum password length is ${PASSWORD_MAX} characters`
    ),

  terms: z.boolean().refine((value) => value, {
    message: "You must accept Terms and Privacy Policy",
  }),
});

export type LoginValues = z.infer<typeof loginSchema>;