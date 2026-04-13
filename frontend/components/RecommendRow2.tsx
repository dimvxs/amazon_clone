import RecommendR2CategoryCard from "./RecommendR2CategoryCard";

export default function RecommendRow2() {
  return (
    
    <div className="w-full max-w-[1528px] mx-auto px-4 md:px-0">
      

      <div className="
        flex flex-row gap-[12px] overflow-x-auto pb-4 scrollbar-hide
        md:grid md:grid-cols-4 md:overflow-x-visible md:gap-[12px]
      ">
        
        
        <RecommendR2CategoryCard 
          title="Smart Home Devices"
          imageSrc="/images-temp/shoes2.jpg"
          isDoubleMobile={true}
          secondItem={{ title: "Office Chairs", imageSrc: "/images-temp/shoes2.jpg" }}
        />

       
        <RecommendR2CategoryCard 
          title="Office Chairs" 
          imageSrc="/images-temp/shoes2.jpg" 
          hideOnMobile={true}
        />

       
        <RecommendR2CategoryCard 
          title="Kitchen Appliances" 
          imageSrc="/images-temp/shoes2.jpg" 
        />

        
        <RecommendR2CategoryCard 
          title="Garden Tools" 
          imageSrc="/images-temp/shoes2.jpg" 
        />

      </div>
    </div>
  );
}