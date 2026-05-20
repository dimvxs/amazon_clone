import { z } from "zod";

const NAME_MIN = 2;
const NAME_MAX = 50;

const PASSWORD_MIN = 8;
const PASSWORD_MAX = 20;

export const signupSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .min(NAME_MIN, `First name must be at least ${NAME_MIN} characters`)
    .max(NAME_MAX, `First name must be less than ${NAME_MAX} characters`),

  lastName: z
    .string()
    .min(1, "Last name is required")
    .min(NAME_MIN, `Last name must be at least ${NAME_MIN} characters`)
    .max(NAME_MAX, `Last name must be less than ${NAME_MAX} characters`),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email format"),

  password: z
    .string()
    .min(1, "Password is required")
    .min(PASSWORD_MIN, `Password must be at least ${PASSWORD_MIN} characters`)
    .max(PASSWORD_MAX, `Password must be less than ${PASSWORD_MAX} characters`),

  terms: z.boolean().refine((v) => v === true, {
    message: "You must accept Terms and Privacy Policy",
  }),
});

export type SignupValues = z.infer<typeof signupSchema>;