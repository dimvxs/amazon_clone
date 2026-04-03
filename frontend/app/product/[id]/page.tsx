"use client";
import AboutItem from "@/components/AboutItem";
import ProductActionsSection from "@/components/ProductActions";
import AboutProduct from "@/components/AboutProduct";

import ProductImageGallery from "@/components/ProductImageGallery";
import ProductManufacturerInfo from "@/components/ProductManufacturerInfo";
import ReviewSection from "@/components/ReviewSection";
import ProductInformation from "@/components/ProductInformation";
import ProductDescription from "@/components/ProductDescription";

import { productData } from "@/public/data/mockData"; 

export default function ProductPage() {
  return (
    <main className="w-full flex justify-center flex-col items-center bg-page-default layout-product-px">
      <div className="w-full max-w-[1528px] flex flex-col gap-[44px] py-[44px]">
        <div className="w-full flex flex-col items-start layout-product-xs:flex-row justify-between gap-4">
          <ProductImageGallery thumbnailCount={12} />
          <AboutProduct product={productData} />
          <ProductActionsSection product={productData} />
        </div>

        <AboutItem tabletOnly items={productData.aboutItems} />

        <ProductManufacturerInfo />
        
        <ProductInformation
          productInfo={productData.productInfo}
          infoSections={productData.infoSections}
        />
        <ProductDescription description={productData.description} />
        <ReviewSection
          reviews={productData.reviews}
          reviewStats={productData.reviewStats}
        />
      </div>
    </main>
  );
}
