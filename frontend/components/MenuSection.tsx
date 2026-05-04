type MenuSectionProps = {
  title: string;
  items: string[];
};

export default function MenuSection({ title, items }: MenuSectionProps) {
  return (
    <div className="mb-[20px] break-inside-avoid text-black">
      <h3 className="font-bold text-[20px] leading-[27px] mb-[12px] font-[Inter]">
        {title}
      </h3>

      <ul className="space-y-[12px] font-[Inter]">
        {items.map((item) => (
          <li
            key={item}
            className="text-[14px] leading-[16px] text-gray-700 hover:text-black cursor-pointer"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
