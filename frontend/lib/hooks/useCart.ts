import { useEffect, useState } from "react";

export type CartItemType = {
  id: number;
  title: string;
  image: string;
  price: number;
  checked: boolean;
  quantity: number;
  inStock: boolean;
};

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [shipping, setShipping] = useState(0);

  useEffect(() => {
    const loadCart = async () => {
      const savedChecked = localStorage.getItem("cartChecked");
      const checkedIds: number[] = savedChecked ? JSON.parse(savedChecked) : [];

      const res = await fetch("/data/cart.json");
      const data = await res.json();

      setShipping(data.shipping);

      const itemsWithChecked = data.items.map((item: CartItemType) => ({
        ...item,
        checked: checkedIds.includes(item.id),
      }));

      setCartItems(itemsWithChecked);
    };

    loadCart();
  }, []);

  useEffect(() => {
    const checkedIds = cartItems
      .filter((item) => item.checked)
      .map((item) => item.id);

    localStorage.setItem("cartChecked", JSON.stringify(checkedIds));
  }, [cartItems]);

  const allChecked =
    cartItems.length > 0 && cartItems.every((item) => item.checked);

  const checkedItems = cartItems.filter((item) => item.checked);

  const updateQuantity = (id: number, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item,
      ),
    );
  };

  const toggleItemChecked = (id: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item,
      ),
    );
  };

  const toggleSelectAll = () => {
    const nextState = !allChecked;
    setCartItems((prev) =>
      prev.map((item) => ({
        ...item,
        checked: nextState,
      })),
    );
  };

  const itemTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const total = itemTotal + shipping;

  return {
    cartItems,
    shipping,
    itemTotal,
    total,
    allChecked,
    checkedItems,
    updateQuantity,
    toggleItemChecked,
    toggleSelectAll,
  };
}
