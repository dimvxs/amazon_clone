import placeholderImage from "@/assets/img/catalog-img.png";
import WishlistItem from "@/components/WishlistItem";

type WishlistItemType = {
  id: number;
  title: string;
  rating: number;
  price: number;
  image: any;
};

function getWishlistByCategory(categoryId: number): WishlistItemType[] {
  switch (categoryId) {
    case 1:
      return [
        {
          id: 1,
          title: "Product 1",
          rating: 3.5,
          price: 1899.30,
          image: placeholderImage,
        },
        {
          id: 2,
          title: "Product 2",
          rating: 4.5,
          price: 1899.30,
          image: placeholderImage,
        },
      ];

    case 2:
      return [
        {
          id: 2,
          title: "Product 3",
          rating: 1.5,
          price: 1899.30,
          image: placeholderImage,
        },
      ];

    default:
      return [];
  }
}
export default async function WishlistPage({
  params,
}: {
  params: { categoryId: string };
}) {
  const { categoryId } = await params;
  const id = Number(categoryId);
  const wishlistItems = getWishlistByCategory(id);

  return (
    <>
      {wishlistItems.length === 0 ? (
        <p className="text-sm text-gray-500">No items in this category.</p>
      ) : (
        wishlistItems.map((item) => (
          <WishlistItem
            key={item.id}
            title={item.title}
            rating={item.rating}
            price={item.price}
            imageSrc={item.image}
          />
        ))
      )}
    </>
  );
}
