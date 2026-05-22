"use client";

const API_BASE = "http://localhost:5012";
const WISHLIST_API = `${API_BASE}/api/wishlist`;
const MY_WISHLIST_API = `${WISHLIST_API}/my`;
const WISHLIST_ITEM_API = `${API_BASE}/api/wishlistitem`;

type WishlistItem = {
  id: number;
  wishlistId: number;
  productId: number;
};

type Wishlist = {
  id: number;
  userId: number;
  name: string;
  items?: WishlistItem[];
};

const loadUserWishlists = async () => {
  const res = await fetch(MY_WISHLIST_API, {
    credentials: "include",
  });

  if (!res.ok) {
    console.error("Failed to load wishlists:", res.status);
    return [];
  }

  const wishlists: Wishlist[] = await res.json();

  return wishlists;
};

const createDefaultWishlist = async () => {
  const res = await fetch(WISHLIST_API, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Default",
    }),
  });

  if (!res.ok) {
    console.error("Failed to create wishlist:", res.status);
    return null;
  }

  const created: Wishlist = await res.json();

  return created;
};

export function useWishlist() {
   const addToWishlist = async (productId: number, wishlistId: number) => {
    const res = await fetch(WISHLIST_ITEM_API, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
        wishlistId,
      }),
    });

    if (!res.ok) {
      console.error("Failed to add product to wishlist:", res.status);
      return;
    }

    console.log("Product added to wishlist");
  };

  const removeFromWishlist = async (wishlistItemId: number) => {
    const res = await fetch(`${WISHLIST_ITEM_API}/${wishlistItemId}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) {
      console.error("Failed to remove product from wishlist:", res.status);
      return;
    }

    window.location.reload();
  };

  return {
    addToWishlist,
    removeFromWishlist,
  };
}
