"use client";
import { createContext, useContext, useEffect, useState } from "react";

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

type CartContextType = {
  cartItems: CartItemType[];
  shipping: number;

  subtotal: number;
  itemTotal: number;
  total: number;
  discountPercent: number;

  allChecked: boolean;
  checkedItems: CartItemType[];

  selectedCount: number;
  cartCount: number;

  addToCart: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  updateQuantity: (id: number, delta: number) => void;

  toggleItemChecked: (id: number) => void;
  toggleSelectAll: () => void;
};

export const CartContext = createContext<CartContextType | null>(null);
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [shipping, setShipping] = useState(0);

  const removeFromCart = async (id: number) => {
    console.log("Deleted product id:", id);
    const res = await fetch(`http://localhost:5012/api/cartitem/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };
  const increaseQuantity = async (id: number) => {
    console.log("Increase Quantity of product id:", id);
    const res = await fetch(`http://localhost:5012/api/cartitem/add/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    updateQuantity(id, 1);
  };
  const decreaseQuantity = async (id: number) => {
    const item = cartItems.find((i) => i.id === id);
    if (!item || item.quantity <= 1) {
      console.log("Prevented decrease below 1:", id);
      return;
    }
    console.log("Decrease Quantity of product id:", id);
    await fetch(`http://localhost:5012/api/cartitem/sub/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    updateQuantity(id, -1);
  };
  const addToCart = async (id: number, quantity: number) => {
    console.log("Added to cart:", { id, quantity });
    const res = await fetch("http://localhost:5012/api/cartitem/create", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ProductId: id,
        Quantity: quantity,
      }),
    })
      .then((response) => response.json())
      .then((result) => console.log("Success:", result));
  };

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

  const allChecked =
    cartItems.length > 0 && cartItems.every((item) => item.checked);

  const toggleSelectAll = () => {
    const nextState = !allChecked;
    setCartItems((prev) =>
      prev.map((item) => ({ ...item, checked: nextState })),
    );
  };

  const checkedItems = cartItems.filter((item) => item.checked);

  const subtotal = checkedItems.reduce(
    (sum, item) => sum + item.listPrice * item.quantity,
    0,
  );

  const itemTotal = checkedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const total = itemTotal + (checkedItems.length > 0 ? shipping : 0);
  const discountAmount = subtotal - itemTotal;
  const discountPercent =
    subtotal > 0 ? Math.round((discountAmount / subtotal) * 100) : 0;
  const cartCount = cartItems.length;
  const selectedCount = checkedItems.length;

  useEffect(() => {
    const loadCart = async () => {
      const savedChecked = localStorage.getItem("cartChecked");
      const checkedIds: number[] = savedChecked ? JSON.parse(savedChecked) : [];
      const res = await fetch("http://localhost:5012/api/cartitem/cart", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      setShipping(data.shipping);

      const itemsWithChecked = data.items.map((item: CartItemType) => ({
        ...item,
        listPrice: item.listPrice ?? item.price,
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

  return (
    <CartContext.Provider
      value={{
        cartItems,
        shipping,
        total,
        subtotal,
        itemTotal,
        allChecked,
        discountPercent,
        checkedItems,
        selectedCount,
        cartCount,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        updateQuantity,
        toggleItemChecked,
        toggleSelectAll,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
