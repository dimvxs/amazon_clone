import RecommendR2CategoryCard from "./RecommendR2CategoryCard";


export default function RecommendRow2() {
  return (
    
    <div className="flex flex-row gap-[12px] overflow-x-auto w-full max-w-[1528px] mx-auto pb-4">
      
     
      <RecommendR2CategoryCard 
        title="Shoes"
        imageSrc="/images-temp/shoes2.jpg" 
        href="#" 
      />
      <RecommendR2CategoryCard 
        title="Shoes"
        imageSrc="/images-temp/shoes2.jpg" 
        href="#" 
      />
      <RecommendR2CategoryCard 
        title="Shoes"
        imageSrc="/images-temp/shoes2.jpg" 
        href="#" 
      />
       <RecommendR2CategoryCard 
        title="Shoes"
        imageSrc="/images-temp/shoes2.jpg" 
        href="#" 
      />

    </div>
  );
}