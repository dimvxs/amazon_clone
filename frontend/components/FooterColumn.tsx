import Link from "next/link";

type FooterItem = {
  name: string;
  href: string;
};

type FooterColumnProps = {
  title: string;
  items: FooterItem[];
};

export default function FooterColumn({ title, items }: FooterColumnProps) {
  return (
    // Фиксированная ширина колонки из Figma — 155px, зазор между заголовком и списком — 12px (gap-3)
    <div className="w-[155px] flex flex-col gap-3 text-[#E6ECF5]">
      
      {/* Заголовок: SemiBold (font-semibold), 18px, line-height 28px */}
      <h2 className="font-semibold text-[18px] leading-[28px] tracking-normal whitespace-nowrap">
        {title}
      </h2>

      {/* Список ссылок: зазор между элементами — 11px (из параметров Figma) */}
      <ul className="flex flex-col gap-[11px]">
        {items.map((item, index) => (
          // Ссылки: Regular (font-normal), 14px, line-height 16px
          <li key={index} className="text-[14px] leading-[16px] font-normal opacity-90 hover:opacity-100 hover:underline transition-opacity">
            <Link href={item.href}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      
    </div>
  );
}