"use client";
import AboutItem from "@/components/AboutItem";
import ProductActionsSection from "@/components/ProductActions";
import AboutProduct from "@/components/AboutProduct";

import ProductImageGallery from "@/components/ProductImageGallery";
import ProductManufacturerInfo from "@/components/ProductManufacturerInfo";
import ReviewSection from "@/components/ReviewSection";
import ProductInformation from "@/components/ProductInformation";

export default function ProductPage() {
  const review = {
    id: 1,
    userName: "User Name",
    title: "Great watch for even a greater price.",
    date: "Reviewed in the United States on December 28, 2025",
    fullText: `This watch is just as good as the higher named brand priced ones. I can
receive texts and calls. Tracks my steps. Syncing to your phone is easy.
The size it perfect. Watches my heart rate. Alarms that I set work
perfectly. I use it at my job. I need a timer for every 30 mins. It start
to vibrate when timer goes off and then easily I can set for the next 30
min. Watch face is easy to read. Looks great on my arm. Holds a charge
for 3 days with use.`,
    helpfulCount: 27,
    images: Array(6).fill("/placeholder-image.jpg"),
  };

  const reviews = Array.from({ length: 10 }, (_, idx) => ({
    ...review,
    id: idx + 1,
  }));

  return (
    <main className="w-full flex justify-center flex-col items-center bg-page-default layout-product-px">
      <div className="w-full max-w-[1528px] flex flex-col gap-[44px] py-[44px]">
        <div className="w-full flex flex-col items-start layout-product-xs:flex-row justify-between gap-4">
          <ProductImageGallery thumbnailCount={12} />
          <AboutProduct />
          <ProductActionsSection />
        </div>
        <AboutItem tabletOnly />
        <ProductManufacturerInfo />

        <ProductInformation/>
        <ReviewSection reviews={reviews} />
      </div>
    </main>
  );
}
