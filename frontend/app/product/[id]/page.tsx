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
import SelectWishlistModal from "@/components/SelectWishlistModal";
import { useWishlist } from "@/lib/hooks/useWishlist";

const API_BASE = "http://localhost:5012";

type Wishlist = {
  id: number;
  userId: number;
  name: string;
};
export default function ProductPage() {
  const params = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userReview, setUserReview] = useState<any>(null);
  const [productData, setProductData] = useState<any>(null);
  const [reviewsData, setReviewsData] = useState<any>(null);
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);

  const { addToWishlist } = useWishlist();

  const fetchReviews = async () => {
    try {
      const reviewsRes = await fetch(
        `${API_BASE}/api/product/reviews/${params.id}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!reviewsRes.ok) {
        console.error("Failed to load reviews:", reviewsRes.status);
        return;
      }

      const reviews = await reviewsRes.json();

      setReviewsData(reviews.result);

      const userReview = reviews.result.userReview;
      setUserReview(userReview?.id === 0 ? null : userReview);
    } catch (err) {
      console.error("Failed to refetch reviews:", err);
    }
  };
  const fetchWishlists = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/Wishlist/my`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        console.error("Failed to fetch wishlists:", res.status);
        return;
      }

      const data = await res.json();
      setWishlists(data);
    } catch (err) {
      console.error("wishlist fetch error:", err);
    }
  };
  const handleConfirmWishlist = (wishlistId: number) => {
    if (!productData) return;

    addToWishlist(productData.id, wishlistId);
  };
  useEffect(() => {
    const loadData = async () => {
      const productRes = await fetch(
        `${API_BASE}/api/product/getpage/${params.id}`,
      );

      if (!productRes.ok) {
        console.error("Failed to load product:", productRes.status);
        return;
      }

      const product = await productRes.json();
      setProductData(product.products);

      await fetchReviews();
      await fetchWishlists();
    };

    loadData();
  }, [params.id]);

  useEffect(() => {
    const loadWishlists = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/Wishlist/my`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("wishlist response status:", res.status);

        if (!res.ok) {
          console.error("Failed to fetch wishlists");
          return;
        }

        const data = await res.json();
        console.log("wishlists:", data);
      } catch (err) {
        console.error("wishlist fetch error:", err);
      }
    };

    loadWishlists();
  }, []);

  const openWishlistModal = () => {
    console.log("Wishlist modal OPEN triggered");
    setIsModalOpen(true);
  };
  const closeWishlistModal = () => {
    console.log("Wishlist modal CLOSE triggered");
    setIsModalOpen(false);
  };

  if (!productData || !reviewsData) {
    return <div>Loading...</div>;
  }

  return (
    <main className="w-full flex justify-center flex-col items-center bg-page-default layout-product-px">
      <div className="w-full max-w-[1528px] flex flex-col gap-[44px] py-[44px]">
        <div className="w-full flex flex-col items-start layout-product-xs:flex-row justify-between gap-4">
          <ProductImageGallery images={productData.images} />
          <AboutProduct
            product={productData}
            onWishlistClick={openWishlistModal}
          />
          <ProductActionsSection
            product={productData}
            onWishlistClick={openWishlistModal}
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
          onReviewCreated={fetchReviews}
          reviewStats={reviewsData.reviewStats}
          product={productData}
          userReview={userReview}
        />
      </div>
      <SelectWishlistModal
        isOpen={isModalOpen}
        onClose={closeWishlistModal}
        wishlists={wishlists}
        onConfirm={handleConfirmWishlist}
      />
    </main>
  );
}
