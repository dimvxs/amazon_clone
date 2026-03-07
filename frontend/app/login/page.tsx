import { AuthInput } from "@/components/AuthInput";
import { AuthCheckbox } from "@/components/AuthCheckbox";

export default function LogInPage() {
  return (
    <main className="py-[141px] flex bg-surface-1 items-center justify-center">
      <div className="w-full max-w-[502px] py-[19.5px] px-[44px] mx-[32px] rounded-[25px] bg-surface-0 ">
        <form className="w-full py-[21.5px] flex flex-col gap-[24px]">
          <h1 className="font-normal text-[24px] text-center text-surface-10">
            Log in
          </h1>

          <AuthInput placeholder="Email" type="email" />
          <AuthInput placeholder="Password" type="password" />

          <AuthCheckbox label="I agree with Terms and Service and Privacy Policy" />

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full max-w-[370px] h-[67px] flex items-center justify-center 
              text-[32px] text-surface-10 
              cursor-pointer rounded-[20px] bg-surface-1"
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}