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

const API_BASE = "http://localhost:5012";
const WISHLIST_API = `${API_BASE}/api/wishlist`;
const WISHLIST_ITEM_API = `${API_BASE}/api/wishlistitem`;

type Wishlist = {
  id: number;
  userId: number;
  name: string;
};

const getCurrentUserId = () => {
  if (typeof window === "undefined") return null;

  const rawUser = localStorage.getItem("user");

  if (!rawUser) return null;

  try {
    const user = JSON.parse(rawUser);
    return user.id;
  } catch {
    return null;
  }
};

export default function ProductPage() {
  const params = useParams();

  const [userReview, setUserReview] = useState<any>(null);
  const [productData, setProductData] = useState<any>(null);
  const [reviewsData, setReviewsData] = useState<any>(null);
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const productRes = await fetch(
          ///data/product.json
          //http://localhost:5012/api/product/getpage/${params.id}
          ///data/reviews.json
          //http://localhost:5012/api/product/reviews/${params.id}
          `${API_BASE}/api/product/getpage/${params.id}`,
      );

      if (!productRes.ok) {
        console.error("Failed to load product:", productRes.status);
        return;
      }

      const product = await productRes.json();

      const reviewsRes = await fetch(
          `${API_BASE}/api/product/reviews/${params.id}`,
          {
              method: "GET",
              credentials: "include",
              headers: {
                  "Content-Type": "application/json",
              },
          });

      if (!reviewsRes.ok) {
        console.error("Failed to load reviews:", reviewsRes.status);
        return;
      }

      const reviews = await reviewsRes.json();

      const userId = getCurrentUserId();

      if (userId) {
        const wishlistRes = await fetch(WISHLIST_API);

        if (wishlistRes.ok) {
          const allWishlists = await wishlistRes.json();

          setWishlists(
              allWishlists.filter(
                  (wishlist: Wishlist) => wishlist.userId === userId,
              ),
          );
        }
      }

      const mockUserReview = {
        id: 999999,
        userName: "User Name",
        title: "My test review",
        date: new Date().toISOString(),
        country: "UA",
        fullText: "This is a mock user review for testing",
        helpfulCount: 0,
        images: [],
      };
        console.log(reviews.result);
      setProductData(product.products);
      setReviewsData(reviews.result);
      setUserReview(mockUserReview);
    };

    loadData();
  }, [params.id]);

  const handleAddToWishlist = async (wishlistId: number) => {
    const productId = Number(params.id);

    if (!Number.isFinite(productId)) {
      console.error("Invalid product id:", params.id);
      return;
    }

    const res = await fetch(WISHLIST_ITEM_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
        wishlistId,
      }),
    });

    if (!res.ok) {
      console.error("Failed to add product to wishlist:", res.status);
      return;
    }

    console.log("Product added to wishlist");
  };

  if (!productData || !reviewsData) {
    return <div>Loading...</div>;
  }

  return (
      <main className="w-full flex justify-center flex-col items-center bg-page-default layout-product-px">
        <div className="w-full max-w-[1528px] flex flex-col gap-[44px] py-[44px]">
          <div className="w-full flex flex-col items-start layout-product-xs:flex-row justify-between gap-4">
            <ProductImageGallery images={productData.images} />
            <AboutProduct product={productData} />

            <ProductActionsSection
                product={productData}
                wishlists={wishlists}
                onAddToWishlist={handleAddToWishlist}
            />
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
              userReview={userReview}
          />
        </div>
      </main>
  );
}
