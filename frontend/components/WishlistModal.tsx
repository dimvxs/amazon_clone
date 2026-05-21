import React, { useEffect, useState } from "react";

type Props = {
  open: boolean;
  initialName?: string;
  title: string;

  confirmLabel?: string;

  onClose: () => void;
  onSubmit: (name: string) => void;
};

export default function WishlistModal({
  open,
  initialName = "",
  title,
  confirmLabel = "Save",
  onClose,
  onSubmit,
}: Props) {
  const [name, setName] = useState(initialName);

  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      setName(initialName);
    }
  }, [open, initialName]);

  if (!open) return null;

  const handleSubmit = () => {
    const trimmed = name.trim();
    if (!trimmed) return;

    onSubmit(trimmed);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center">
      <div className="bg-card-default w-[320px] p-[20px] rounded-[20px] flex flex-col">
        <div className="flex items-center justify-between mb-[12px]">
          <h2 className="text-lg font-semibold">{title}</h2>

          <button
            onClick={onClose}
            className="size-[32px] flex items-center justify-center rounded-full border-white border cursor-pointer"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-[8px] mb-[20px]">
          <label>List name:</label>
          <input
            className="bg-main py-[7px] px-[14px] rounded-[10px] text-black/80"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Wishlist name"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="bg-surface-accent px-[24px] py-[6px] rounded-[20px] w-fit"
        >
          {confirmLabel}
        </button>
      </div>
    </div>
  );
}
