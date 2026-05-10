import RecommendR2CategoryCard from "./RecommendR2CategoryCard"; 
import RecommendR2DoubleMobile from "./RecommendR2DoubleMobile"; 

interface CardData {
  title: string;
  imageSrc: string;
  href?: string;
}

export default function RecommendRow2() { 
  const data: CardData[] = [ 
    { title: "Smart Home Devices", imageSrc: "/images-temp/shoes2.jpg", href: "/category/smart-home" }, 
    { title: "Office Chairs", imageSrc: "/images-temp/shoes2.jpg", href: "/category/chairs" }, 
    { title: "Gaming Keyboards", imageSrc: "/images-temp/shoes2.jpg", href: "/category/keyboards" }, 
    { title: "Power Banks", imageSrc: "/images-temp/shoes2.jpg", href: "/category/power-banks" }, 
  ]; 

  return ( 
    <section className="w-full bg-transparent"> 
      {/* Используем те же настройки контейнера, что и в BestSellersBanner */}
      <div className="max-w-[1528px] mx-auto px-4 md:px-0"> 
        
        {/* MOBILE VERSION: Horizontal Scroll (Hidden on md+) */}
        <div className="flex overflow-x-auto pb-6 gap-[12px] md:hidden no-scrollbar snap-x snap-mandatory">
          
          {/* Block 1: Double Card */}
          <div className="w-[calc(100vw-32px)] flex-shrink-0 snap-start">
            <RecommendR2DoubleMobile 
              topCard={data[0]} 
              bottomCard={data[1]} 
            /> 
          </div>

          {/* Block 2: Single Card */}
          <div className="w-[calc(100vw-32px)] flex-shrink-0 snap-start">
            <RecommendR2CategoryCard 
              title={data[2].title} 
              imageSrc={data[2].imageSrc} 
              href={data[2].href} 
            /> 
          </div>

          {/* Block 3: Single Card */}
          <div className="w-[calc(100vw-32px)] flex-shrink-0 snap-start">
            <RecommendR2CategoryCard 
              title={data[3].title} 
              imageSrc={data[3].imageSrc} 
              href={data[3].href} 
            /> 
          </div>
        </div>

        {/* DESKTOP & TABLET: Grid Layout */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-[12px]"> 
          {data.map((card, idx) => ( 
            <RecommendR2CategoryCard 
              key={idx} 
              title={card.title} 
              imageSrc={card.imageSrc} 
              href={card.href} 
            /> 
          ))} 
        </div>

      </div> 
    </section> 
  ); 
}