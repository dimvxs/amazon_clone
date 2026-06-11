"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/lib/hooks/useCart";

import CartItem from "@/components/CartItem";
import CartItemCard from "@/components/CartItemCard";
import CheckoutDesktop from "@/components/CheckoutDesktop";
import CheckoutMobile from "@/components/CheckoutMobile";
import SelectAllCart from "@/components/SelectAllCart";
import CheckoutLayout from "@/components/CheckoutLayout";

// Импортируем компонент слайдера
import CatalogSlider from "@/components/CatalogSlider";

export default function CartPage() {
  const [open, setOpen] = useState(false);
  
  // Храним чистый массив товаров для слайдера
  const [sliderProducts, setSliderProducts] = useState<any[]>([]);

  // Защита хука корзины от падения бэкенда (когда data.shipping равен null)
  const cartData = useCart() || {};

  const cartItems = cartData.cartItems || [];
  const shipping = cartData.shipping !== undefined && cartData.shipping !== null ? cartData.shipping : 10;
  const cartCount = cartData.cartCount || 0;
  const selectedCount = cartData.selectedCount || 0;
  const itemTotal = cartData.itemTotal || 0;
  const discountPercent = cartData.discountPercent || 0;
  const subtotal = cartData.subtotal || 0;
  const total = cartData.total || 0;
  const allChecked = cartData.allChecked || false;

  const toggleItemChecked = cartData.toggleItemChecked || (() => {});
  const toggleSelectAll = cartData.toggleSelectAll || (() => {});
  const increaseQuantity = cartData.increaseQuantity || (() => {});
  const decreaseQuantity = cartData.decreaseQuantity || (() => {});
  const removeFromCart = cartData.removeFromCart || (() => {});

  // Загружаем данные из твоего локального json главной страницы
  useEffect(() => {
    const loadSliderData = async () => {
      try {
        const res = await fetch("/data/homepage.json");
        const data = await res.json();
        
        // Берем из твоего JSON именно массив "catalogSlider"
        if (data && data.catalogSlider) {
          setSliderProducts(data.catalogSlider);
        }
      } catch (error) {
        console.error("Failed to load slider data for cart:", error);
      }
    };

    loadSliderData();
  }, []);

  return (
    <>
      {/* Флекс-контейнер, чтобы слайдер встал строго под блоком корзины */}
      <div className="w-full flex flex-col gap-[60px] pb-[80px]">
        <CheckoutLayout
          title="Shopping cart"
          header={
            <SelectAllCart
              checked={allChecked}
              count={cartCount}
              onToggle={toggleSelectAll}
            />
          }
          sidebar={
            <CheckoutDesktop
              selectedCount={selectedCount}
              discount={discountPercent}
              subtotal={subtotal}
              itemTotal={itemTotal}
              setOpen={setOpen}
              shipping={shipping}
              total={total}
            />
          }
        >
          {cartItems.length === 0 ? (
            <CartItemCard>
              <span className="text-[20px] leading-[100%] px-[14px]">
                No items
              </span>
            </CartItemCard>
          ) : (
            cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                checked={item.checked}
                onToggleCheck={() => toggleItemChecked(item.id)}
                onIncrease={() => increaseQuantity(item.id)}
                onDecrease={() => decreaseQuantity(item.id)}
                onDelete={() => removeFromCart(item.id)}
              />
            ))
          )}
        </CheckoutLayout>

        {/* СЛАЙДЕР РЕКОМЕНДАЦИЙ В КОРЗИНЕ */}
        {sliderProducts.length > 0 && (
          <div className="w-full max-w-[1680px] mx-auto sm:px-[30px] px-[10px]">
            {/* Передаем чистый массив CatalogItemJSON[], ошибку TypeScript исправили */}
            <CatalogSlider data={sliderProducts} />
          </div>
        )}
      </div>

      {selectedCount > 0 && (
        <CheckoutMobile
          discount={discountPercent}
          itemTotal={itemTotal}
          setOpen={setOpen}
          shipping={shipping}
          total={total}
          open={open}
        />
      )}
    </>
  );
}