import ProductQuantitySelector from "./ProductQuantitySelector";
import ProductActionButton from "./ProductActionButton";

interface ProductPurchaseActionsProps {
  maxQuantity?: number;
  tabletOnly?: boolean;
}

export default function ProductPurchaseActions({
  maxQuantity = 10,
  tabletOnly = false,
}: ProductPurchaseActionsProps) {
  return (
    <div
      className={
        tabletOnly
          ? "hidden layout-product-xs:block layout-product-lg:hidden max-w-[206px]"
          : "block layout-product-xs:hidden layout-product-lg:block"
      }
    >
      <div className="flex flex-col gap-2 text-default"> 
        <span className="text-[17px] leading-[24px] align-middle">In Stock</span>
        <ProductQuantitySelector maxCount={maxQuantity} />
        <ProductActionButton>Add to Cart</ProductActionButton>
        <ProductActionButton>Buy Now</ProductActionButton>
      </div>
    </div>
  );
}