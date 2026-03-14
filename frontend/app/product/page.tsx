"use client";

export default function ProductPage() {
  return (
    <main className="w-full flex justify-center">
      <div className="w-full max-w-[1528px] flex flex-col layout-product-xs:flex-row justify-between gap-4">
        <section className="layout-product-xs:max-w-[507px] layout-product-xs:w-[100%] layout-product-md:min-w-[507px] layout-xs:min-w-[386px] w-full bg-red-200 ">
          <div className="flex flex-col layout-product-xs:flex-row gap-3">
            <div className="order-2 layout-product-xs:order-1 flex flex-row layout-product-xs:flex-col gap-2">
              <div className="w-[50px] h-[50px] bg-gray-300 shrink-0"></div>
              <div className="w-[50px] h-[50px] bg-gray-300 shrink-0"></div>
              <div className="w-[50px] h-[50px] bg-gray-300 shrink-0"></div>
              <div className="w-[50px] h-[50px] bg-gray-300 shrink-0"></div>
            </div>

            <div className="order-1 layout-product-xs:order-2 w-full layout-product-xs:flex-1 h-[442px] bg-yellow-200">
              Image container
            </div>
          </div>
        </section>

        <section className="w-full layout-product-md:w-[637px] bg-green-200">
          Info section
        </section>

        <section className="w-full layout-product-xs:w-[244px] bg-blue-200 block layout-product-xs:hidden layout-product-lg:block shrink-0">
          Actions section
        </section>
      </div>
    </main>
  );
}
