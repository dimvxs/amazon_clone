import Link from "next/link";

type FooterItem = {
  name: string;
  href: string;
};

type FooterColumnProps = {
  title: string;
  items: FooterItem[];
  hideOnMobile?: boolean;
};

export default function FooterColumn({
  title,
  items,
  hideOnMobile,
}: FooterColumnProps) {
  return (
    <div
      className={`flex flex-col gap-[13px] ${hideOnMobile ? "hidden layout-xs:flex" : ""}`}
    >
      <h2 className="font-bold text-[15px] leading-[16px]">{title}</h2>

      <ul className="flex flex-col layout-xs:gap-[11px] gap-[13px]">
        {items.map((item, index) => (
          <li
            key={index}
            className={`text-[13px] leading-[16px] font-normal ${index >= 2 ? "hidden layout-xs:list-item" : ""}`}
          >
            <Link href={item.href}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
