import Image from 'next/image';

interface Banner {
  title: string;
  imageSrc: string;
  href: string;
}

export default function SalesBanner({ title, imageSrc, href = '#' }: Banner) {
    return (
      <div className="w-[1528px] h-[281px] rounded-[15px] border border-[#2F3A52] shrink-0 py-[15px] px-[20px] gap-[10px]">
           <Image
            src={imageSrc}
            alt={`Category ${title}`}
            width={1528}
            height={281}
            className="object-cover w-full h-full"
          />     
      </div>
    );
  }