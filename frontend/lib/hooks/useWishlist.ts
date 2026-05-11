"use client";

const API_BASE = "http://localhost:5012";
const WISHLIST_API = `${API_BASE}/api/wishlist`;
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

const getCurrentUserId = () => {
  if (typeof window === "undefined") return null;

  const rawUser = localStorage.getItem("user");

  if (!rawUser) return null;

  try {
    const user = JSON.parse(rawUser);
    return user.id;
  } catch {
    return null;
  }
};

const loadUserWishlists = async () => {
  const userId = getCurrentUserId();

  if (!userId) {
    console.error("User is not authorized");
    return [];
  }

  const res = await fetch(WISHLIST_API);

  if (!res.ok) {
    console.error("Failed to load wishlists:", res.status);
    return [];
  }

  const wishlists: Wishlist[] = await res.json();

  return wishlists.filter((wishlist) => wishlist.userId === userId);
};

const createDefaultWishlist = async () => {
  const userId = getCurrentUserId();

  if (!userId) {
    console.error("User is not authorized");
    return null;
  }

  const res = await fetch(WISHLIST_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
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

const selectWishlist = async () => {
  let wishlists = await loadUserWishlists();

  if (wishlists.length === 0) {
    const created = await createDefaultWishlist();

    if (!created) return null;

    return created.id;
  }

  if (wishlists.length === 1) {
    return wishlists[0].id;
  }

  const listText = wishlists
      .map((wishlist) => `${wishlist.id}: ${wishlist.name}`)
      .join("\n");

  const selectedId = window.prompt(`Choose wishlist ID:\n${listText}`);

  if (!selectedId) return null;

  const wishlistId = Number(selectedId);

  if (!Number.isFinite(wishlistId)) {
    console.error("Invalid wishlist id");
    return null;
  }

  const exists = wishlists.some((wishlist) => wishlist.id === wishlistId);

  if (!exists) {
    console.error("Wishlist not found");
    return null;
  }

  return wishlistId;
};

export function useWishlist() {
  const addToWishlist = async (productId: number) => {
    const wishlistId = await selectWishlist();

    if (!wishlistId) return;

    const wishlists = await loadUserWishlists();
    const targetWishlist = wishlists.find((wishlist) => wishlist.id === wishlistId);

    const alreadyExists = targetWishlist?.items?.some(
        (item) => item.productId === productId
    );

    if (alreadyExists) {
      console.log("Product already exists in wishlist");
      return;
    }

    const res = await fetch(WISHLIST_ITEM_API, {
      method: "POST",
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
