import RecommendR3CategoryCard from "./RecommendR3CategoryCard";
import RecommendR3SliderCard from "./RecommendR3SliderCard";

export default function RecommendRow3() {
  return (
    
    <div className="grid grid-cols-1  gap-[12px] px-4 w-full
    md:flex md:flex-row  md:overflow-x-auto md:px-0 md:gap-[12px]
    max-w-[1528px] mx-auto pb-8">
      
     
      <RecommendR3SliderCard 
      requestTitle="Shoes"
      productName="Slippers"
        price="20"
        imageSrc="/images-temp/slippers.png" 
        href="#" 
      />
      <RecommendR3CategoryCard 
        title="Toys" 
        imageSrc="/images-temp/slippers.png" 
        href="#" 
      />
     <RecommendR3SliderCard 
      requestTitle="Shoes"
      productName="Slippers"
        price="20"
        imageSrc="/images-temp/slippers.png" 
        href="#" 
      />
      <RecommendR3CategoryCard 
        title="Toys" 
        imageSrc="/images-temp/slippers.png" 
        href="#" 
      />

    </div>
  );
}