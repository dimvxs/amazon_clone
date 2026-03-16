"use client";
import AboutItem from "@/components/AboutItem";
import ProductActionsSection from "@/components/ProductActions";
import ProductInfo from "@/components/ProductInfo";

import ProductImageGallery from "@/components/ProductImageGallery";
import ProductManufacturerInfo from "@/components/ProductManufacturerInfo";

export default function ProductPage() {
  return (
    <main className="w-full flex justify-center flex-col items-center bg-page-default layout-product-px">
      <div className="w-full max-w-[1528px] flex flex-col gap-[44px] py-[44px]">
        <div className="w-full flex flex-col items-start layout-product-xs:flex-row justify-between gap-4">
          <ProductImageGallery thumbnailCount={12} />
          <ProductInfo />
          <ProductActionsSection />
        </div>
        <AboutItem tabletOnly />
        <ProductManufacturerInfo />
      </div>
    </main>
  );
}
