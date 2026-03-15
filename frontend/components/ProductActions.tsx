import ProductInfoTable from "./ProductInfoTable";
import ProductPrice from "./ProductPrice";
import ProductPurchaseActions from "./ProductPurchaseActions";
export default function ProductActions() {
  return (
    <section
      className="w-full layout-product-xs:w-[244px] block layout-product-xs:hidden layout-product-lg:block shrink-0 
    bg-surface-card px-[14px] py-[14px] text-default rounded-lg border-card"
    >
      <div className="flex flex-col gap-[14px]">
        <ProductPrice />
        <p className="text-[13.6px] leading-[20px]">
          FREE delivery <span className="font-bold">Monday, February</span>
        </p>

        <div className="flex items-center gap-2 text-muted">
          <div className="w-[16px] h-[14px] bg-muted"></div>
          <span className="text-[11.3px] leading-[18px] align-middle">
            Delivering to Council Bluffs 51502
          </span>
        </div>
        <ProductPurchaseActions />
        <ProductInfoTable
          rows={[
            { label: "Shipper / Seller" },
            { label: "Returns", value: "FREE 30-day refund/replacement" },
            { label: "Payment", value: "Secure transaction" },
          ]}
        />
      </div>
    </section>
  );
}
