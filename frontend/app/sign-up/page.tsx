import { AuthInput } from "@/components/AuthInput";
import { AuthCheckbox } from "@/components/AuthCheckbox";
import { AuthCard } from "@/components/AuthCard";

export default function SignUpPage() {
  return (
    <main className="flex py-[141px] bg-surface-1 items-center justify-center">
       <AuthCard title="Sign up" buttonText="Sign up">
        <AuthInput placeholder="First Name" type="text" />
        <AuthInput placeholder="Last Name" type="text" />
        <AuthInput placeholder="Email" type="email" />
        <AuthInput placeholder="Password" type="password" />
        <AuthCheckbox label="I agree with Terms and Service and Privacy Policy" />
      </AuthCard>
    </main>
  );
}