"use client";

import FooterColumn from "./FooterColumn";
import SocialIconLink from "./SocialIconLink";
import socialIcon from "@/assets/icons/placeholder.svg";

export default function Footer() {
  const placeholderLinks = [
    { name: "Careers", href: "/careers" },
    { name: "Careers", href: "/careers" },
    { name: "Careers", href: "/careers" },
    { name: "Careers", href: "/careers" },
  ];
  return (
    <footer className="w-full bg-surface-1 text-surface-3">
      <div className="w-full layout-px">
        <div className="w-full layout-px flex justify-center">
          <button
            className="h-[43px] layout-xs:h-[49px] text-[13px] flex items-center justify-center cursor-pointer   "
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Back to top
          </button>
        </div>

        <div className="flex justify-center mt-[34px] mb-[34px] layout-xs:mb-[63px] layout-xs:mt-[46px]">
          <div className="w-[980px] flex justify-between gap-[13px]">
            <FooterColumn title="Get to Know Us" items={placeholderLinks} />
            <FooterColumn title="Get to Know Us" items={placeholderLinks} />
            <FooterColumn title="Get to Know Us" items={placeholderLinks} />
            <FooterColumn
              title="Get to Know Us"
              items={placeholderLinks}
              hideOnMobile
            />
          </div>
        </div>

        <div className="flex justify-center mb-[34px] layout-xs:hidden">
          <div className="flex gap-[15px]">
            <SocialIconLink href="/" src={socialIcon} alt="Social" />
            <SocialIconLink href="/" src={socialIcon} alt="Social" />
            <SocialIconLink href="/" src={socialIcon} alt="Social" />
          </div>
        </div>
      </div>

      <div className="border-t border-surface-3">
        <div className="h-[35px] layout-xs:h-[84px]"></div>
      </div>
    </footer>
  );
}
