import { SubmitEventHandler } from "react";

type AuthCardProps = {
  title: string;
  buttonText: string;
  children: React.ReactNode;
  onSubmit?: SubmitEventHandler<HTMLFormElement>;
};

export function AuthCard({ title, buttonText, children, onSubmit }: AuthCardProps) {
  return (
    <div className="w-[502px] bg-surface-0 py-[19.5px] px-[44px] mx-[32px] rounded-[25px]">
      <form onSubmit={onSubmit} className="w-full py-[21.5px] flex flex-col gap-[24px]">
        <h1 className="font-normal text-[24px] text-center text-surface-10">
          {title}
        </h1>

        {children}

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full max-w-[370px] h-[67px] bg-surface-1 text-[32px] text-surface-10 flex items-center justify-center cursor-pointer rounded-[20px]"
          >
            {buttonText}
          </button>
        </div>
      </form>
    </div>
  );
}