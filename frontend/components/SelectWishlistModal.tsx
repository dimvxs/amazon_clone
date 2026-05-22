import { useState } from "react";
import { CloseButton } from "./CloseButton";

type Wishlist = {
  id: number;
  userId: number;
  name: string;
};

interface SelectWishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlists: Wishlist[];
  onConfirm: (wishlistId: number) => void;
}

export default function SelectWishlistModal({
  isOpen,
  onClose,
  wishlists,
  onConfirm,
}: SelectWishlistModalProps) {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [selectedWishlist, setSelectedWishlist] = useState<Wishlist | null>(
    null,
  );

  const toggleDropdown = () => setIsOpenDropdown((prev) => !prev);

  const handleSelect = (wishlist: Wishlist) => {
    console.log("Selected wishlist:", wishlist);
    setSelectedWishlist(wishlist);
    setIsOpenDropdown(false);
  };

  const handleConfirm = () => {
    if (!selectedWishlist) return;
    console.log("CONFIRMED wishlist:", selectedWishlist);
    onConfirm(selectedWishlist.id);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 layout-px">
      <div className="w-full max-w-[370px] card-default rounded-[20px] p-[20px]">
        <div className="flex mb-[12px] justify-between ">
          <h2 className="text-[20px] font-semibold leading-[32px] align-middle text-surface-accent-muted">
            Add to wishlist
          </h2>
          <CloseButton onClick={onClose} />
        </div>

        <div className="relative mb-[20px] text-input/60">
          <button
            onClick={toggleDropdown}
            className="w-full px-[14px] py-[8px] bg-main flex rounded-[10px] justify-between items-center cursor-pointer"
          >
            <span className="text-[16px] font-normal leading-[18px] tracking-[0] align-middle">
              {selectedWishlist ? selectedWishlist.name : "Choose a wishlist:"}
            </span>
            <span>▼</span>
          </button>

          <div
            className={`absolute left-0 right-0 -my-[8px] rounded-b-[10px] bg-main overflow-hidden z-10 transition-all duration-300 ease-in-out
              ${
                isOpenDropdown
                  ? "max-h-[300px] opacity-100 translate-y-0"
                  : "max-h-0 opacity-0 -translate-y-2 pointer-events-none"
              }
            `}
          >
            <div
              className="max-h-[300px] mt-[8px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent 
              text-[13px] leading-[13px] font-normal align-middle"
            >
              {wishlists.length > 0 ? (
                wishlists.map((wishlist) => (
                  <div
                    key={wishlist.id}
                    onClick={() => handleSelect(wishlist)}
                    className="px-[14px] py-[6px] hover:bg-gray-100 cursor-pointer text-sm"
                  >
                    {wishlist.name}
                  </div>
                ))
              ) : (
                <div className="px-[14px] py-[6px] text-sm text-gray-500">
                  No wishlists found
                </div>
              )}
            </div>
          </div>
        </div>

        <button 
          onClick={handleConfirm}
          disabled={!selectedWishlist}
          className={`px-[24px] py-[6px] rounded-[20px] text-main bg-surface-accent hover:bg-button-hover transition-colors duration-200 ease-in-out ${
            selectedWishlist
              ? "cursor-pointer"
              : "cursor-not-allowed opacity-60"
          }`}
        >
          Save in wishlist
        </button>
      </div>
    </div>
  );
}
