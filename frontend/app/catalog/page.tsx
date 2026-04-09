"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import StarsRating from "@/components/StarsRating";
import Image from "next/image";

export default function CatalogPage() {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/data/catalog_products.json");
      const data = await res.json();
      setProducts(data.products);
    };

    fetchProducts();
  }, []);

  const ProductCard = ({
    product,
  }: {
    product: {
      id: number;
      title: string;
      price: number;
      rating: number;
      imageUrl: string;
    };
  }) => {
    return (
      <div
        onClick={() => router.push(`/product/${product.id}`)}
        className="cursor-pointer w-full rounded-[10px] overflow-hidden flex flex-col"
      >
        <div className="relative aspect-[272/285] w-full bg-gray-300">
          <Image
            src={product.imageUrl}
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
    <main className="w-full flex bg-page-default layout-product-px">
      <div className="w-full max-w-[1680px] flex justify-between gap-[72px] py-[44px] bg-gray-800">
        <div className="w-full max-w-[200px] flex flex-col gap-[44px] py-[44px] bg-gray-500">
          <span>Filter menu</span>
        </div>
        <div className="w-full w-[1400px] flex flex-col bg-gray-600">
          <div
            className="
            grid
            gap-x-[10px]
    gap-y-[18px]
            grid-cols-[repeat(auto-fit,minmax(180px,1fr))]
            xl:grid-cols-5
          "
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}