import placeholderImage from "@/assets/img/catalog-img.png";
import WishlistItem from "@/components/WishlistItem";

export default async function WishlistPage({
  params,
}: {
  params: { categoryId: string };
}) {
  console.log("params.categoryId:", params.categoryId);
  console.log("categoryId number:", Number(params.categoryId));

  const wishlistItems = [
    {
      id: 1,
      title: "Product 1",
      rating: 3.5,
      price: "1,899.30$",
      image: placeholderImage,
    },
    {
      id: 2,
      title: "Product 2",
      rating: 4.2,
      price: "2,499.00$",
      image: placeholderImage,
    },
  ];
  return (
    <>
      {wishlistItems.map((item) => (
        <WishlistItem
          key={item.id}
          title={item.title}
          rating={item.rating}
          price={item.price}
          imageSrc={item.image}
        />
      ))}
    </>
  );
}
