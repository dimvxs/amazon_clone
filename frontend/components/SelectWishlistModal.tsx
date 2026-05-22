import { useState } from "react";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-[90%] max-w-md rounded-xl p-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Select Wishlist</h2>

        <div className="relative mb-6">
          <button
            onClick={toggleDropdown}
            className="w-full border rounded-lg px-4 py-3 text-left bg-white flex justify-between items-center"
          >
            <span className="text-sm text-gray-700">
              {selectedWishlist ? selectedWishlist.name : "Choose wishlist"}
            </span>

            <span className="text-gray-500">▼</span>
          </button>

          {isOpenDropdown && (
            <div className="absolute left-0 right-0 mt-2 border rounded-lg bg-white shadow-lg max-h-48 overflow-y-auto z-10">
              {wishlists.length > 0 ? (
                wishlists.map((wishlist) => (
                  <div
                    key={wishlist.id}
                    onClick={() => handleSelect(wishlist)}
                    className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-sm"
                  >
                    {wishlist.name}
                  </div>
                ))
              ) : (
                <div className="px-4 py-3 text-sm text-gray-500">
                  No wishlists found
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-black rounded-md"
          >
            Cancel
          </button>

          <button
            onClick={handleConfirm}
            disabled={!selectedWishlist}
            className={`px-4 py-2 rounded-md text-white ${
              selectedWishlist
                ? "bg-black hover:bg-gray-800"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
