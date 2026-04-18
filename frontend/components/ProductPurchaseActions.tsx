"use client";

import ProductQuantitySelector from "./ProductQuantitySelector";
import ProductActionButton from "./ProductActionButton";
import { useState } from "react";
import { useCart } from "@/lib/hooks/useCart";

interface ProductPurchaseActionsProps {
  maxQuantity?: number;
  inStock?: boolean;
  tabletOnly?: boolean;
  productId: number;
}
export default function ProductPurchaseActions({
  maxQuantity,
  inStock = true,
  tabletOnly = false,
  productId,
}: ProductPurchaseActionsProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const handleAddToCart = () => {
    addToCart(productId, quantity);
  };
  
  return (
    <div
      className={
        tabletOnly
          ? "hidden layout-product-xs:block layout-product-lg:hidden max-w-[206px]"
          : "block layout-product-xs:hidden layout-product-lg:block"
      }
    >
      <div className="flex flex-col gap-2">
        <span className="text-[17px] leading-[24px] align-middle">
          {inStock ? "In Stock" : "Out of Stock"}
        </span>

        <ProductQuantitySelector
          maxCount={maxQuantity}
          value={quantity}
          onChange={setQuantity}
        />
        <ProductActionButton
          onClick={handleAddToCart}
          className="bg-surface-accent text-text-main"
        >
          Add to Cart
        </ProductActionButton>
        <ProductActionButton className="bg-surface-accent-muted text-text-dark">
          Buy Now
        </ProductActionButton>
      </div>
    </div>
  );
}
