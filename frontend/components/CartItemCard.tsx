export default function CartItemCard({
  children,
}: React.PropsWithChildren) {
  return (
    <div
      className="sm:px-[20px] sm:py-[17px] p-[10px] gap-[12px] 
      w-full flex card-default !rounded-[10px]"
    >
      {children}
    </div>
  );
}