import RecommendR2CategoryCard from "./RecommendR2CategoryCard"; 
import RecommendR2DoubleMobile from "./RecommendR2DoubleMobile"; 

interface CardDataJSON {
  title: string;
  imageSrc: string;
  url: string;
}

interface RecommendRow2Props {
  data: CardDataJSON[];
}

export default function RecommendRow2({ data }: RecommendRow2Props) { 
 
  if (!data || data.length < 4) return null;

  return ( 
    <section className="w-full bg-transparent"> 
      <div className="max-w-[1528px] mx-auto px-4 md:px-0"> 
        
       
        <div className="flex overflow-x-auto pb-6 gap-[12px] md:hidden no-scrollbar snap-x snap-mandatory">
          
          
          <div className="w-[calc(100vw-32px)] flex-shrink-0 snap-start">
            <RecommendR2DoubleMobile 
              topCard={{
                title: data[0].title,
                imageSrc: data[0].imageSrc,
                href: data[0].url
              }} 
              bottomCard={{
                title: data[1].title,
                imageSrc: data[1].imageSrc,
                href: data[1].url
              }} 
            /> 
          </div>

          
          <div className="w-[calc(100vw-32px)] flex-shrink-0 snap-start">
            <RecommendR2CategoryCard 
              title={data[2].title} 
              imageSrc={data[2].imageSrc} 
              href={data[2].url} 
            /> 
          </div>

         
          <div className="w-[calc(100vw-32px)] flex-shrink-0 snap-start">
            <RecommendR2CategoryCard 
              title={data[3].title} 
              imageSrc={data[3].imageSrc} 
              href={data[3].url} 
            /> 
          </div>
        </div>

      
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-[12px]"> 
          {data.slice(0, 4).map((card, idx) => ( 
            <RecommendR2CategoryCard 
              key={idx} 
              title={card.title} 
              imageSrc={card.imageSrc} 
              href={card.url} 
            /> 
          ))} 
        </div>

      </div> 
    </section> 
  ); 
}