import RecommendR3CategoryCard from "./RecommendR3CategoryCard";
import RecommendR3SliderCard from "./RecommendR3SliderCard";

interface Row3Product {
  type: "product";
  title: string;
  name: string;
  price: string;
  images: string[];
  url: string;
}

interface Row3Category {
  type: "category";
  title: string;
  imageSrc: string;
  url: string;
}

type Row3Item = Row3Product | Row3Category;

interface RecommendRow3Props {
  data: Row3Item[];
}

export default function RecommendRow3({ data }: RecommendRow3Props) {
  if (!data || data.length === 0) return null;

  
  const products = data.filter((item) => item.type === "product") as Row3Product[];
  const categories = data.filter((item) => item.type === "category") as Row3Category[];
  
  const alternatedData: Row3Item[] = [];
  const maxLength = Math.max(products.length, categories.length);

  for (let i = 0; i < maxLength; i++) {
    if (products[i]) alternatedData.push(products[i]);
    if (categories[i]) alternatedData.push(categories[i]);
  }

  return (
    <div className="grid grid-cols-1 gap-[12px] px-4 w-full
      /* Tablet: 5 колонок (2 для продукта + 3 для категории = 5) */
      md:grid-cols-5 
      /* Desktop: 4 колонки (все по 1 колонке) */
      lg:grid-cols-4 lg:px-0 lg:gap-[12px]
      max-w-[1528px] mx-auto pb-8 items-stretch">
      
      {alternatedData.map((item, idx) => {
       
        const pairIndex = Math.floor(idx / 2);
        const isEvenRow = pairIndex % 2 === 1;

        
        const desktopOrder = `lg:order-${idx + 1}`;

        if (item.type === "product") {
          const formattedItems = item.images.map((img) => ({
            productName: item.name,
            price: item.price,
            imageSrc: img,
            href: item.url
          }));

         
          const tabletOrder = isEvenRow ? "md:order-2" : "md:order-none";

          return (
            <div 
              key={idx} 
              className={`col-span-1 md:col-span-2 lg:col-span-1 ${tabletOrder} ${desktopOrder}`}
            >
              <RecommendR3SliderCard 
                requestTitle={item.title}
                items={formattedItems}
              />
            </div>
          );
        }

        if (item.type === "category") {
          
          const tabletOrder = isEvenRow ? "md:order-1" : "md:order-none";

          return (
            <div 
              key={idx} 
              className={`col-span-1 md:col-span-3 lg:col-span-1 ${tabletOrder} ${desktopOrder}`}
            >
              <RecommendR3CategoryCard category={item} />
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}