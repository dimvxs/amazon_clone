import { AuthInput } from "@/components/AuthInput";
import { AuthCheckbox } from "@/components/AuthCheckbox";
import { AuthCard } from "@/components/AuthCard";

export default function LogInPage() {
  return (
    <main className="flex py-[141px] bg-surface-1 items-center justify-center">
       <AuthCard title="Log in" buttonText="Log in">
        <AuthInput placeholder="Email" type="email" />
        <AuthInput placeholder="Password" type="password" />
        <AuthCheckbox label="I agree with Terms and Service and Privacy Policy" />
      </AuthCard>
    </main>
  );
}