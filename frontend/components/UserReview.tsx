import StarsRating from "./StarsRating";
interface UserReviewProps {
  userName: string;
  title: string;
  date: string;
  fullText: string;
  helpfulCount: number;
  images: string[];
}

export default function UserReview({
  userName,
  title,
  date,
  fullText,
  helpfulCount,
  images,
}: UserReviewProps) {
  return (
    <div className="w-full bg-purple-400 flex flex-col text-default">
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
          <p className="text-body">{date}</p>
        </div>

        <p className="text-body">{fullText}</p>

        <div className="flex gap-2 overflow-x-auto no-scrollbar snap-x">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="w-[66px] h-[88px] flex-shrink-0 bg-gray-300 snap-start"
              style={{
                backgroundImage: `url(${img})`,
                backgroundSize: "cover",
              }}
            />
          ))}
        </div>
        <p className="text-black text-body">
          {helpfulCount} people found this helpful
        </p>
        <div className="flex gap-2">
          <button className="btn-pill bg-gray-200">Like</button>
          <button className="btn-pill bg-transparent border">Report</button>
        </div>
      </div>
    </div>
  );
}
