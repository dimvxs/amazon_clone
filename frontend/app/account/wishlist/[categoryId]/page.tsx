import WishlistClient from "@/components/WishlistClient";

const API_BASE = "http://localhost:5012";
const API = `${API_BASE}/api/wishlist`;

type WishlistItemDTO = {
  id: number;
  wishlistId: number;
  productId: number;
  productName: string;
  productPrice: number;
  productImageUrl?: string | null;
};

type WishlistDTO = {
  id: number;
  userId: number;
  name: string;
  items: WishlistItemDTO[];
};

const getImageSrc = (imageUrl?: string | null) => {
  if (!imageUrl) return "";

  if (imageUrl.startsWith("http")) {
    return imageUrl;
  }

  return `${API_BASE}${imageUrl.startsWith("/") ? "" : "/"}${imageUrl}`;
};

export default async function WishlistPage({
                                             params,
                                           }: {
  params: { categoryId: string };
}) {
  const wishlistId = Number(params.categoryId);

  const res = await fetch(`${API}/${wishlistId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Failed to load wishlist:", res.status);
    return <WishlistClient items={[]} />;
  }

  const wishlist: WishlistDTO = await res.json();

  const wishlistItems = (wishlist.items || []).map((item) => ({
    id: item.id,
    title: item.productName,
    rating: 0,
    price: item.productPrice,
    image: getImageSrc(item.productImageUrl),
  }));

  return <WishlistClient items={wishlistItems} />;
}
