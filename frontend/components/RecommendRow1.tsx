import RecommendR1CardBlock from "./RecommendR1CardBlock";
import RecommendR1CardTablet1 from "./RecommendR1CardTablet1";
import RecommendR1DoubleBlock from "./RecommendR1DoubleBlock";

export default function RecommendRow1() {
  const data = [
    {
      title: "Electronics & Gadgets",
      items: [
        { title: "Smartphones", imageSrc: "/images-temp/shoes2.jpg" },
        { title: "Laptops", imageSrc: "/images-temp/shoes2.jpg" },
        { title: "Smart Watches", imageSrc: "/images-temp/shoes2.jpg" },
        { title: "Wireless Earbuds", imageSrc: "/images-temp/shoes2.jpg" },
      ]
    },
    {
      title: "Home & Kitchen",
      items: [
        { title: "Coffee Machines", imageSrc: "/images-temp/shoes2.jpg" },
        { title: "Air Fryers", imageSrc: "/images-temp/shoes2.jpg" },
        { title: "Vacuum Cleaners", imageSrc: "/images-temp/shoes2.jpg" },
        { title: "Kitchen Blenders", imageSrc: "/images-temp/shoes2.jpg" },
      ]
    },
    {
      title: "Gaming & Entertainment",
      items: [
        { title: "Gaming Consoles", imageSrc: "/images-temp/shoes2.jpg" },
        { title: "PC Gaming Gear", imageSrc: "/images-temp/shoes2.jpg" },
        { title: "VR Headsets", imageSrc: "/images-temp/shoes2.jpg" },
        { title: "Streaming Devices", imageSrc: "/images-temp/shoes2.jpg" },
      ]
    },
    {
      title: "Fashion & Accessories",
      items: [
        { title: "Sneakers", imageSrc: "/images-temp/shoes2.jpg" },
        { title: "Backpacks", imageSrc: "/images-temp/shoes2.jpg" },
        { title: "Sunglasses", imageSrc: "/images-temp/shoes2.jpg" },
        { title: "Jewelry", imageSrc: "/images-temp/shoes2.jpg" },
      ]
    }
  ];

  return (
    <section className="w-full px-4 md:px-0">
      <div className="max-w-[1528px] mx-auto">
        
        {/* ВЕРСИЯ ДЛЯ MOBILE И DESKTOP */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:hidden lg:grid lg:grid-cols-4 gap-[12px]">
          {data.map((card, idx) => (
            <RecommendR1CardBlock 
              key={idx} 
              mainTitle={card.title} 
              items={card.items} 
            />
          ))}
        </div>

        {/* ВЕРСИЯ ДЛЯ ПЛАНШЕТА (MD) */}
        <div className="hidden md:grid lg:hidden grid-cols-3 gap-[14px]">
          {/* 1 - Левая карточка (Планшетная версия 1) */}
          <RecommendR1CardTablet1 
            mainTitle={data[0].title} 
            items={data[0].items} 
          />

          {/* 2 - Центральный блок (Двойной стек) */}
          {/* Исправлено: передаем объекты с ключом mainTitle, как того требует интерфейс компонента */}
          <RecommendR1DoubleBlock 
            topCardData={{
              mainTitle: data[1].title,
              items: data[1].items
            }} 
            bottomCardData={{
              mainTitle: data[2].title,
              items: data[2].items
            }} 
          />

          {/* 3 - Правая карточка (Планшетная версия 1) */}
          <RecommendR1CardTablet1 
            mainTitle={data[3].title} 
            items={data[3].items} 
          />
        </div>

      </div>
    </section>
  );
}