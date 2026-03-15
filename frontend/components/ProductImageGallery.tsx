"use client";

import ProductThumbnail from "./ProductThumbnail";

interface ProductImageGalleryProps {
  thumbnailCount?: number;
}

export default function ProductImageGallery({
  thumbnailCount = 4,
}: ProductImageGalleryProps) {
  const thumbnailsToRender = Math.min(thumbnailCount, 7);
  return (
    <section className="layout-product-xs:max-w-[507px] layout-product-xs:w-[100%] layout-product-md:min-w-[507px] layout-xs:min-w-[386px] w-full bg-red-200">
      <div className="flex flex-col layout-product-xs:flex-row gap-3">
        <div
          className="
    order-2 layout-product-xs:order-1
    flex flex-row layout-product-xs:flex-col gap-2
    max-w-full layout-product-xs:max-h-[442px]
    overflow-x-auto layout-product-xs:overflow-y-auto
    overflow-y-hidden layout-product-xs:overflow-x-hidden
[scrollbar-width:none] [&::-webkit-scrollbar]:hidden
  "
        >
          {Array.from({ length: thumbnailsToRender }).map((_, index) => (
            <ProductThumbnail key={index} />
          ))}
        </div>

        <div className="order-1 layout-product-xs:order-2 w-full layout-product-xs:flex-1 h-[442px] bg-yellow-200">
          Image container
        </div>
      </div>
    </section>
  );
}
