export default function ProductInformation({ productInfo, infoSections }: { productInfo: any[], infoSections: any[] }) {

  return (
    <section className="text-default flex flex-col w-full layout-product-sm:gap-[140px] gap-[20px] layout-product-sm:flex-row">
      <div className="w-full flex flex-col gap-[24px]">
        <h2 className="text-title-md">Product information</h2>
        <div className="w-full flex flex-col gap-[12px]">
          {productInfo.map((item, index) => (
            <div
              key={index}
              className="flex justify-between w-full border-t py-[4px] gap-[20px]"
            >
              <span className="font-inter font-bold text-[14px] leading-[20px] align-middle">
                {item.label}
              </span>
              <span className="font-inter font-normal text-[14px] leading-[20px] align-middle text-right">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col gap-[10px]">
        {infoSections.map((section, index) => (
          <div key={index} className="flex flex-col gap-[10px]">
            <h3 className="text-title-sm">{section.title}</h3>
            <p className="border-t">{section.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
