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
    <div className="w-full bg-purple-400 flex flex-col">
      <div className="flex items-center">
        <div className="w-[27px] h-[27px] rounded-full bg-gray-300"></div>
        <span className="text-black">{userName}</span>
      </div>

      <p className="text-black">{title}</p>

      <p className="text-black">{date}</p>
      <p className="text-black">{fullText}</p>
      <div className="flex gap-2 overflow-x-auto no-scrollbar snap-x">
        {images.map((img, idx) => (
          <div
            key={idx}
            className="w-[66px] h-[88px] flex-shrink-0 bg-gray-300 snap-start"
            style={{ backgroundImage: `url(${img})`, backgroundSize: "cover" }}
          />
        ))}
      </div>
      <p className="text-black">{helpfulCount} people found this helpful</p>
      <div className="flex gap-2">
        <button className="w-[87px] h-[29px] rounded-[25px] bg-gray-300 text-black">
          Helpful
        </button>
        <button className="w-[87px] h-[29px] rounded-[25px] bg-gray-300 text-black">
          Report
        </button>
      </div>
    </div>
  );
}