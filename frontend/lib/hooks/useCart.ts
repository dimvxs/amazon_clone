import { useEffect, useState } from "react";

export type CartItemType = {
  id: number;
  title: string;
  image: string;
  price: number;
  checked: boolean;
  quantity: number;
  inStock: boolean;
  listPrice: number;
  discount: number;
};

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [shipping, setShipping] = useState(0);

  const removeFromCart = (id: number) => {
    console.log("Deleted product id:", id);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };
  const increaseQuantity = (id: number) => {
    console.log("Increase Quantity of product id:", id);
    updateQuantity(id, 1);
  };
  const decreaseQuantity = (id: number) => {
    console.log("Decrease Quantity of product id:", id);
    updateQuantity(id, -1);
  };
  const addToCart = (id: number, quantity: number) => {
    console.log("Added to cart:", { id, quantity });
  };

  useEffect(() => {
    const loadCart = async () => {
      const savedChecked = localStorage.getItem("cartChecked");
      const checkedIds: number[] = savedChecked ? JSON.parse(savedChecked) : [];

      ///data/cart.json
      //http://localhost:5012/api/cartitem/cart
      const res = await fetch("http://localhost:5012/api/cartitem/cart");
      const data = await res.json();
      console.log(data);

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
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  };
}
