"use client";

export default function AccountDetails() {
  return (
    <form>
      <div className="flex flex-col gap-[12px] layout-account-sm:flex-row">
        <div className="flex flex-col w-full layout-account-sm:max-w-[200px]">
          <span className="font-semibold text-[16px] leading-[32px] align-middle">
            First name
          </span>
          <input className="w-full bg-white" />
        </div>

        <div className="flex flex-col w-full layout-account-sm:max-w-[200px]">
          <span className="font-semibold text-[16px] leading-[32px] align-middle">
            Last name
          </span>
          <input className="w-full bg-white" />
        </div>
      </div>

      <div className="flex flex-col">
        <span className="font-semibold text-[16px] leading-[32px] align-middle">
          Email
        </span>
        <input className="w-full bg-white" />
      </div>

      <div className="flex flex-col">
        <span className="font-semibold text-[16px] leading-[32px] align-middle">
          Password
        </span>
        <input className="w-full bg-white" />
      </div>

      <div className="flex flex-col">
        <span className="font-semibold text-[16px] leading-[32px] align-middle">
          Phone number
        </span>
        <div className="w-full bg-white flex">
          <button>Icon</button>
          <input className="w-full" />
        </div>
      </div>

      <div className="flex flex-col max-w-[200px]">
        <span className="font-semibold text-[16px] leading-[32px] align-middle">
          Date of Birth
        </span>
        <div className="bg-white flex">
          <input className="w-full" />
          <button>Icon</button>
        </div>
      </div>
    </form>
  );
}
