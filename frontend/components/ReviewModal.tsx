import { useState } from "react";
import StarsRating from "./StarsRating";

import video from "@/assets/img/video-icon.png";
import photo from "@/assets/img/photo-icon.png";
import MediaUploadButton from "./MediaUploadButton";
import UserReviewField from "./UserReviewField";

type ReviewModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ReviewModal({ isOpen, onClose }: ReviewModalProps) {
  if (!isOpen) return null;
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("rating", String(rating));
    formData.append("title", title);
    formData.append("review", review);
    images.forEach((file) => {
      formData.append("images", file);
    });
    videos.forEach((file) => {
      formData.append("videos", file);
    });
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 layout-px"
      onClick={onClose}
    >
      <form
        onSubmit={handleSubmit}
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a short title for your review"
            className="bg-white"
          />
        </UserReviewField>
        <UserReviewField label="Review">
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write your review here..."
            className="bg-white"
            rows={6}
          />
        </UserReviewField>

        <UserReviewField label="Add real photos/videos of the product">
          <div className="flex items-top gap-[10px]">
            <MediaUploadButton
              type="image"
              icon={photo}
              alt="Add photos"
              onFilesSelect={(files) => {
                setImages((prev) => [...prev, ...files]);
              }}
            />

            <MediaUploadButton
              type="video"
              icon={video}
              alt="Add videos"
              onFilesSelect={(files) => {
                setVideos((prev) => [...prev, ...files]);
              }}
            />
          </div>
        </UserReviewField>
        <button
          type="submit"
          className="bg-surface-accent h-[32px] rounded-[100px] text-body text-white max-w-[289px]"
        >
          Write a customer review
        </button>
      </form>
    </div>
  );
}
