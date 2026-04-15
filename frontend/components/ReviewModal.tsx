import { useState } from "react";
import StarsRating from "./StarsRating";

type ReviewModalProps = {
  isOpen: boolean;
  onClose: () => void;
};
const UserReviewField = ({
  label,
  optional = false,
  children,
}: {
  label: string;
  optional?: boolean;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-[8px]">
      <label>
        {label}:{optional && <span className="text-gray-400"> (optional)</span>}
      </label>
      {children}
    </div>
  );
};

export default function ReviewModal({ isOpen, onClose }: ReviewModalProps) {
  if (!isOpen) return null;
  const [rating, setRating] = useState(0);

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 layout-px"
      onClick={onClose}
    >
      <div
        className="bg-gray-600 p-6 rounded-[12px] w-[1082px] flex flex-col gap-[18px]"
        onClick={(e) => e.stopPropagation()}
      >
        <UserReviewField label="Make a review about">
          <div className="flex items-top gap-[12px]">
            <div className="w-[72px] h-[72px] bg-white" />
            <div className="flex-col flex">
              <span>Product name</span>
              <span>Product desc</span>
            </div>
          </div>
        </UserReviewField>
        <UserReviewField label="Rate this product">
          <StarsRating
            size={30}
            rating={rating}
            interactive
            onChange={setRating}
          />
        </UserReviewField>
        <UserReviewField label="Review Title" optional>
          <input
            type="text"
            placeholder="Enter a short title for your review"
            className="bg-white"
          />
        </UserReviewField>
        <UserReviewField label="Review">
          <textarea
            placeholder="Write your review here..."
            className="bg-white"
            rows={6}
          />
        </UserReviewField>
        <UserReviewField label="Add real photos/videos of the product">
          <div className="flex items-top gap-[10px]">
            <button className="w-[72px] h-[72px] bg-white" />
            <button className="w-[72px] h-[72px] bg-white" />
          </div>
        </UserReviewField>

        <button className="bg-surface-accent h-[32px] rounded-[100px] text-body text-white max-w-[289px]">
          Write a customer review
        </button>
      </div>
    </div>
  );
}
