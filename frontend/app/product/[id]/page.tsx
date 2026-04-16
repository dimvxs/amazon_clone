"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import AboutItem from "@/components/AboutItem";
import ProductActionsSection from "@/components/ProductActions";
import AboutProduct from "@/components/AboutProduct";

import ProductImageGallery from "@/components/ProductImageGallery";
import ProductManufacturerInfo from "@/components/ProductManufacturerInfo";
import ReviewSection from "@/components/ReviewSection";
import ProductInformation from "@/components/ProductInformation";
import ProductDescription from "@/components/ProductDescription";

export default function ProductPage() {
  const params = useParams();
  const [productData, setProductData] = useState<any>(null);
  const [reviewsData, setReviewsData] = useState<any>(null);

  useEffect(() => {
    const loadData = async () => {
      ///data/product.json
      //http://localhost:5012/api/product/getpage/${params.id}
      ///data/reviews.json
      //http://localhost:5012/api/review/getpage/
      const productRes = await fetch(
        `http://localhost:5012/api/product/getpage/${params.id}`,
      );
      const product = await productRes.json();

      const reviewsRes = await fetch(
        `http://localhost:5012/api/product/reviews/${params.id}`,
      );
      const reviews = await reviewsRes.json();
      console.log(reviews);
      setProductData(product.products);
      setReviewsData(reviews.result);
    };

    loadData();
  }, []);

  if (!productData || !reviewsData) {
    return <div>Loading...</div>;
  }

  return (
    <main className="w-full flex justify-center flex-col items-center bg-page-default layout-product-px">
      <div className="w-full max-w-[1528px] flex flex-col gap-[44px] py-[44px]">
        <div className="w-full flex flex-col items-start layout-product-xs:flex-row justify-between gap-4">
          <ProductImageGallery images={productData.images} />
          <AboutProduct product={productData} />
          <ProductActionsSection product={productData} />
        </div>

        <AboutItem tabletOnly items={productData.aboutItems} />

        <ProductManufacturerInfo />

        <ProductInformation
          productInfo={productData.productInfo}
          warranty={productData.warranty}
        />

        <ProductDescription description={productData.description} />

        <ReviewSection
          reviews={reviewsData.reviews}
          reviewStats={reviewsData.reviewStats}
          product={productData}
        />
      </div>
    </main>
  );
}
