import { SubmitEventHandler } from "react";
import PageTabLink from "./PageTabLink";

type AuthCardProps = {
  buttonText: string;
  children: React.ReactNode;
  onSubmit?: SubmitEventHandler<HTMLFormElement>;
  title: "login" | "signup";
};

export function AuthCard({
  buttonText,
  children,
  title,
  onSubmit,
}: AuthCardProps) {
  return (
    <div className="w-[414px] py-[19.5px] my-[140px] py-[29px] mx-[21px]">
      <form onSubmit={onSubmit} className="w-full flex flex-col gap-[24px]">
        <div className="flex gap-4">
          <PageTabLink href="/login" active={title === "login"}>
            Log in
          </PageTabLink>
          <PageTabLink href="/sign-up" active={title === "signup"}>
            Sign Up
          </PageTabLink>
        </div>
        {children}

        <div className="flex justify-center">
          <button
            type="submit"
            className="max-w-[370px] w-[200px] h-[67px] bg-surface-accent text-[24px] leading-[38px]  cursor-pointer rounded-[20px]"
          >
            {buttonText}
          </button>
        </div>
      </form>
    </div>
  );
}
