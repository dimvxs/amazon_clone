import { Review } from "@/lib/types/review";
import StarsRating from "./StarsRating";
import { useState } from "react";
interface UserReviewProps {
  review: Review;
}

export default function UserReview({ review }: UserReviewProps) {
  const { id, userName, title, date, country, fullText, helpfulCount, images } =
    review;
  const [count, setCount] = useState(helpfulCount);
  const AddHelpful = () => {
    fetch(`http://localhost:5012/api/review/helpful/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        setCount((prev) => prev + 1);
      }
    });
  };
  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-col gap-[11px]">
        <div className="flex items-center gap-[10px]">
          <div className="w-[27px] h-[27px] rounded-full bg-gray-300"></div>
          <span className="font-sans font-normal text-[12px] leading-[19px] align-middle">
            {userName}
          </span>
        </div>
        <div className="flex gap-[2px]">
          <StarsRating size={16} gap={2} />
        </div>
        <div className="flex flex-col gap-[5px]">
          <p className="text-title">{title}</p>
          <p className="text-body">
            Reviewed in {country} on{" "}
            {new Date(date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <p className="text-body">{fullText}</p>

        <div className="ml-[6px] flex gap-[6px] overflow-x-auto no-scrollbar snap-x ">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="w-[66px] h-[88px] rounded-[12px] flex-shrink-0 bg-gray-300 snap-start"
              style={{
                backgroundImage: `url(${img})`,
                backgroundSize: "cover",
              }}
            />
          ))}
        </div>
        <p className="text-body">{count} people found this helpful</p>
        <div className="flex gap-2">
          <button
            className="btn-pill bg-surface-accent-muted"
            onClick={AddHelpful}
          >
            Like
          </button>
          <button className="btn-pill bg-transparent border border-white text-white">
            Report
          </button>
        </div>
      </div>
    </div>
  );
}
