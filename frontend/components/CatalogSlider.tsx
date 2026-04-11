import CatalogSliderCard from "./CatalogSliderCard";

export default function CatalogSlider() {
  return (
    
    <div className="flex flex-row gap-[31px] overflow-x-auto no-scrollbar w-full max-w-[1528px] mx-auto py-2.5">
        
      <CatalogSliderCard 
      title="Shoes"
        price="20"
        imageSrc="/images-temp/slippers.png" 
        href="#" 
      />
      <CatalogSliderCard 
      title="Shoes"
        price="20"
        imageSrc="/images-temp/slippers.png" 
        href="#" 
      />
      <CatalogSliderCard 
      title="Shoes"
        price="20"
        imageSrc="/images-temp/slippers.png" 
        href="#" 
      />
      <CatalogSliderCard 
      title="Shoes"
        price="20"
        imageSrc="/images-temp/slippers.png" 
        href="#" 
      />

    </div>
  );
}