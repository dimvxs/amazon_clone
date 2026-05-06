type MenuSectionProps = {
  title: string;
  items: string[];
};

export default function MenuSection({ title, items }: MenuSectionProps) {
  return (
    <div className="mb-[20px] break-inside-avoid">
      <h3 className="text-category-md mb-[12px]">{title}</h3>

      <ul className="space-y-[12px]">
        {items.map((item) => (
          <li
            key={item}
            className="text-category-sm"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
