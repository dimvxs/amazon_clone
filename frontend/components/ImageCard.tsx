export default function ImageCard({ label = "Laptops" }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full aspect-[146/120] bg-gray-400 rounded-[10px]" />
      <span className="text-xs mt-1">{label}</span>
    </div>
  );
}