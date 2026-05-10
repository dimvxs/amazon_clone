import RecommendR3CategoryCard from "./RecommendR3CategoryCard";
import RecommendR3SliderCard from "./RecommendR3SliderCard";

export default function RecommendRow3() {
  return (
    <div className="grid grid-cols-1 gap-[12px] px-4 w-full
      /* Tablet: 5 колонок */
      md:grid-cols-5 
      /* Desktop: 4 колонки */
      lg:grid-cols-4 lg:px-0 lg:gap-[12px]
      max-w-[1528px] mx-auto pb-8 items-stretch">
      
      {/* 1. Slider Card */}
      <div className="col-span-1 md:col-span-2 md:order-1 lg:col-span-1">
        <RecommendR3SliderCard 
          requestTitle="Shoes"
          productName="Slippers"
          price="20"
          imageSrc="/images-temp/slippers.png" 
          href="#" 
        />
      </div>

      {/* 2. Category Card */}
      <div className="col-span-1 md:col-span-3 md:order-3 lg:col-span-1 lg:order-2">
        <RecommendR3CategoryCard 
          title="Toys" 
          imageSrc="/images-temp/slippers.png" 
          href="#" 
        />
      </div>

      {/* 3. Slider Card */}
      <div className="col-span-1 md:col-span-2 md:order-4 lg:col-span-1 lg:order-3">
        <RecommendR3SliderCard 
          requestTitle="Shoes"
          productName="Slippers"
          price="20"
          imageSrc="/images-temp/slippers.png" 
          href="#" 
        />
      </div>

      {/* 4. Category Card */}
      <div className="col-span-1 md:col-span-3 md:order-2 lg:col-span-1 lg:order-4">
        <RecommendR3CategoryCard 
          title="Toys" 
          imageSrc="/images-temp/slippers.png" 
          href="#" 
        />
      </div>

    </div>
  );
}