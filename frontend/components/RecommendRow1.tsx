import RecommendR1CardBlock from "./RecommendR1CardBlock";

export default function RecommendRow1() {
  const electronics = [
    { title: "Smartphones", imageSrc: "/images-temp/shoes2.jpg" },
    { title: "Laptops", imageSrc: "/images-temp/shoes2.jpg" },
    { title: "Smart Watches", imageSrc: "/images-temp/shoes2.jpg" },
    { title: "Earbuds", imageSrc: "/images-temp/shoes2.jpg" },
  ];

  const homeKitchen = [
    { title: "Coffee", imageSrc: "/images-temp/shoes2.jpg" },
    { title: "Air Fryers", imageSrc: "/images-temp/shoes2.jpg" },
    { title: "Vacuums", imageSrc: "/images-temp/shoes2.jpg" },
    { title: "Blenders", imageSrc: "/images-temp/shoes2.jpg" },
  ];

  return (
    <div className="grid grid-cols-2 gap-[12px] px-4
    md:flex md:flex-row md:justify-between md:gap-0 md:px-0 md:overflow-visible
     w-full max-w-[1528px] mx-auto pb-8">
      <RecommendR1CardBlock mainTitle="Electronics & Gadgets" items={electronics} />
      <RecommendR1CardBlock mainTitle="Home & Kitchen" items={homeKitchen} />
      <RecommendR1CardBlock mainTitle="Best Sellers" items={electronics} />
      <RecommendR1CardBlock mainTitle="New Arrivals" items={homeKitchen} />
    </div>
  );
}