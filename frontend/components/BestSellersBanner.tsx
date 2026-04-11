import Image from 'next/image';

interface Banner {
  title: string;
  imageSrc: string;
  href: string;
}

export default function BestSellersBanner({ title, imageSrc, href = '#' }: Banner) {
    return (
      <div className="flex flex-col w-[1528px] h-[293px] bg-[#1F2636] rounded-[15px] border border-[#2F3A52] shrink-0 py-[15px] px-[20px] gap-[10px]">
        <div className="flex flex-col w-full h-[263px] gap-[12px]">
              {/* Шапка карточки (Heading 2) */}
        <div className=" flex items-center w-full h-[31px] ">
          <h2 className="font-sans font-bold text-[20px] text-[#E6EAF2]">
            {title}
          </h2>
        </div>
  
        {/* Контейнер для изображения */}
        <div className="relative w-full h-[220px] rounded-[10px] overflow-hidden mt-1">
           <Image
            src={imageSrc}
            alt={`Category ${title}`}
            width={1488}
            height={220}
            className="object-cover w-full h-full"
          /> 
        </div>

        </div>
      
        
      </div>
    );
  }