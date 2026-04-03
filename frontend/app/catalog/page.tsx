"use client";

import { useRouter } from "next/navigation";
import StarsRating from "@/components/StarsRating";
import placeholderIcon from "@/assets/img/catalog-img.png";
import Image from "next/image";

export default function CatalogPage() {
  const router = useRouter();

  const products = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: "Wireless Gaming Headset Pro X",
    price: 99.99,
    rating: 4.5,
    image: placeholderIcon,
  }));

  const ProductCard = ({
    product,
  }: {
    product: {
      id: number;
      title: string;
      price: number;
      rating: number;
      image: any;
    };
  }) => {
    return (
      <div
        onClick={() => router.push(`/product/${product.id}`)}
        className="cursor-pointer w-full rounded-[10px] overflow-hidden flex flex-col"
      >
        <div className="relative aspect-[272/285] w-full bg-gray-300">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="p-[10px] flex flex-col gap-[6px] text-main bg-gray-700">
          <p className="text-[14px] leading-[20px] line-clamp-2">
            {product.title}
          </p>

          <div className="flex gap-1">
            <span>{product.rating}</span>
            <StarsRating size={13} />
          </div>

          <p className="flex items-start">
            <span>$</span>
            <span>{product.price}</span>
          </p>

          <button className="flex items-start">Add to cart</button>
        </div>
      </div>
    );
  };

  return (
    <main className="w-full flex justify-center flex-col items-center bg-page-default layout-product-px">
      <div className="w-full max-w-[1528px] flex flex-col gap-[44px] py-[44px]">
        <span className="text-[24px] font-medium">Catalog</span>

        <div
          className="
            grid gap-[26px]
            grid-cols-[repeat(auto-fit,minmax(180px,1fr))]
            xl:grid-cols-5
          "
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}
