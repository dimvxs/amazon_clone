export function useWishlist() {
  const addToWishlist = (productId: number) => {
    console.log("Added to wishlist:", productId);
  };

  const removeFromWishlist = (productId: number) => {
    console.log("Removed from wishlist:", productId);
  };

  return {
    addToWishlist,
    removeFromWishlist,
  };
}