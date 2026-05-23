import { useState } from "react";
import ModalWrapper from "./ModalWrapper";
import Icon from "@/assets/icons/arrow-back.svg?react";

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
    <ModalWrapper title="Add to wishlist" onClose={onClose}>
      <div className="relative mb-[20px] ">
        <button
          onClick={toggleDropdown}
          className="w-full px-[14px] py-[8px] bg-main flex rounded-[10px] justify-between items-center cursor-pointer"
        >
          <span
            className={`text-[16px] font-normal leading-[18px] tracking-[0] align-middle ${
              selectedWishlist ? "text-dark" : "text-input/60"
            }`}
          >
            {selectedWishlist ? selectedWishlist.name : "Choose a wishlist:"}
          </span>
          <Icon
            className={`w-[14px] h-[8px] text-input/60 transition-transform duration-200 ${
              isOpenDropdown ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        <div
          className={` text-input/60 absolute left-0 right-0 -my-[8px] rounded-b-[10px] bg-main overflow-hidden z-10 transition-all duration-300 ease-in-out
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
                  className="px-[14px] py-[6px] hover:bg-gray-100 cursor-pointer text-sm "
                >
                  {wishlist.name}
                </div>
              ))
            ) : (
              <div className="px-[14px] py-[6px] text-sm">
                No wishlists found
              </div>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={handleConfirm}
        disabled={!selectedWishlist}
        className={`px-[24px] py-[6px] rounded-[20px] text-main bg-surface-accent ${
          selectedWishlist ? "cursor-pointer hover:bg-button-hover transition-colors duration-200 ease-in-out" : "cursor-not-allowed opacity-60"
        }`}
      >
        Save in wishlist
      </button>
    </ModalWrapper>
  );
}
