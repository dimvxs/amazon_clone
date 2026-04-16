import { useState, useEffect } from "react";
import StarsRating from "./StarsRating";
import MediaUploadButton from "./MediaUploadButton";
import UserReviewField from "./UserReviewField";
import Image from "next/image";
import { validateReviewForm } from "@/lib/validation/reviewValidation";
import { useLockBodyScroll } from "@/lib/hooks/useLockBodyScroll";
import CtaButton from "./CtaButton";
import UploadedFilesList from "./UploadedFilesList";

type ReviewModalProps = {
  isOpen: boolean;
  product: any;
  onClose: () => void;
};

export default function ReviewModal({
  isOpen,
  product,
  onClose,
}: ReviewModalProps) {
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);

  useLockBodyScroll(isOpen);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      rating,
      title,
      review,
    };

    const validationErrors = validateReviewForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      console.log("Validation errors:", validationErrors);
      return;
    }

    const fd = new FormData();
    fd.append("productId", String(product.id));
    fd.append("rating", String(rating));
    fd.append("title", title);
    fd.append("review", review);
    images.forEach((file) => fd.append("images", file));
    videos.forEach((file) => fd.append("videos", file));

    for (const [key, value] of fd.entries()) {
      console.log(key, value);
    }

    setRating(5);
    setTitle("");
    setReview("");
    setImages([]);
    setVideos([]);

    onClose();
  };
  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };
  const removeVideo = (index: number) => {
    setVideos((prev) => prev.filter((_, i) => i !== index));
  };
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 layout-px"
      onClick={onClose}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-[12px] w-[1082px] max-h-[95vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="overflow-y-auto flex flex-col gap-[18px] no-scrollbar">
          <UserReviewField label="Make a review about">
            <div className="flex items-top gap-[12px]">
              <div className="size-[72px] relative shrink-0 rounded-[10px] overflow-hidden">
                <Image
                  src={product.images.main}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-col flex gap-[8px]">
                <span className="text-[20px] leading-[18px]">
                  {product.title}
                </span>
                <span className="font-normal text-[14px] leading-[20px] align-middle opacity-60">
                  {product.description}
                </span>
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
              className="input-default px-[14px] py-[7px] "
            />
          </UserReviewField>
          <UserReviewField label="Review">
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your review here..."
              className="input-default px-[14px] py-[7px]"
              rows={6}
            />
          </UserReviewField>
          <UserReviewField label="Add real photos/videos of the product">
            <div className="flex items-top gap-[10px]">
              <MediaUploadButton
                type="image"
                onFilesSelect={(files) => {
                  setImages((prev) => [...prev, ...files]);
                }}
              />

              <MediaUploadButton
                type="video"
                onFilesSelect={(files) => {
                  setVideos((prev) => [...prev, ...files]);
                }}
              />
            </div>
          </UserReviewField>

          <UploadedFilesList
            images={images}
            videos={videos}
            onRemoveImage={(index) =>
              setImages((prev) => prev.filter((_, i) => i !== index))
            }
            onRemoveVideo={(index) =>
              setVideos((prev) => prev.filter((_, i) => i !== index))
            }
          />
          <CtaButton
            type="submit"
            className="text-[16px] max-w-[289px] shrink-0"
          >
            Write a customer review
          </CtaButton>
        </div>
      </form>
    </div>
  );
}
