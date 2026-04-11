import RecommendR3CategoryCard from "./RecommendR3CategoryCard";
import RecommendR3SliderCard from "./RecommendR3SliderCard";

export default function RecommendRow3() {
  return (
    
    <div className="flex flex-row gap-[12px] overflow-x-auto w-full max-w-[1528px] mx-auto pb-4">
      
     
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