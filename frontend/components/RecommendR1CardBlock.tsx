import Image from 'next/image';

interface GridItem {
  title: string;
  imageSrc: string;
}

interface RecommendR1CardProps {
  mainTitle: string;
  items: GridItem[];
  className?: string;
}

export default function RecommendR1CardBlock({ mainTitle, items = [], className = '' }: RecommendR1CardProps) {
  return (
    <div className={`
      flex flex-col bg-[#1F2636] border border-[#2F3A52] rounded-[15px] shadow-xl w-full 
      /* Мобилка: стандартные отступы */
      p-[16px] gap-[12px]
      /* Планшет (из Снимок экрана 2026-05-06 в 19.23.07.jpg): специфичные паддинги */
      md:pt-[14px] md:px-[18px] md:pb-[18px] md:gap-[10px]
      /* Десктоп: возврат к исходным значениям */
      lg:p-[20px_28px] lg:gap-[12px]
      ${className}`}
    >
      
      <h2 className={`
        text-[#E6ECF5] font-sans font-bold 
        text-[18px] leading-[27px] 
        /* Планшет: размер 20px (Снимок экрана 2026-05-06 в 19.23.19.jpg) */
        md:text-[20px] 
        lg:text-[20px]
      `}>
        {mainTitle}
      </h2>

      {/* Сетка: меняем колонки в зависимости от экрана */}
      <div className={`
        grid gap-y-[12px] gap-x-[12px]
        /* Мобилка/Десктоп: 2 колонки (исходя из твоего кода) */
        grid-cols-2 
        /* Планшет: если нужно оставить 2х2 с другими зазорами (Снимок экрана 2026-05-06 в 19.23.48.jpg) */
        md:gap-x-[6px] md:gap-y-[6px]
        /* Десктоп: большие зазоры */
        lg:gap-x-[28px] lg:gap-y-[10px]
      `}>
        {items.slice(0, 4).map((item, index) => (
          <div key={index} className="flex flex-col gap-[5px] w-full">
            <div className={`
              relative w-full rounded-[10px] overflow-hidden bg-white/5
              /* Мобилка/Десктоп: пропорция 146/120 */
              aspect-[146/120]
              /* Планшет: фиксированная высота 84px (Снимок экрана 2026-05-06 в 19.23.55.jpg) */
              md:h-[84px] md:aspect-auto
              lg:aspect-[146/120] lg:h-auto
            `}>
              <Image
                src={item.imageSrc}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
            <span className={`
              font-sans font-normal text-[#E6ECF5] truncate
              /* Мобилка: 12px */
              text-[12px] leading-[18px]
              /* Планшет: 10px (Снимок экрана 2026-05-06 в 19.24.02.jpg) */
              md:text-[10px] md:leading-[14px]
              /* Десктоп: 16px */
              lg:text-[16px] lg:leading-[18px]
            `}>
              {item.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}