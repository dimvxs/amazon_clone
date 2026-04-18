export function useWishlist() {
  const addToWishlist = (productId: number) => {
    console.log("Added to wishlist:", productId);
  };

  return {
    addToWishlist,
  };
}