import Image from 'next/image';

interface Banner {
  title: string;
  imageSrc: string;
  href?: string;
}

export default function SalesBanner({ title, imageSrc, href = '#' }: Banner) {
  return (
  
    <div className="w-full max-w-[1528px] mx-auto px-4 md:px-0">
      
      <div className="
        relative w-full overflow-hidden rounded-[15px] border border-[#2F3A52] shrink-0
        h-[281px] 
        max-md:h-[281px]
      ">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 1528px) 100vw, 1528px"
          priority
        />
      </div>
    </div>
  );
}