type UserReviewFieldProps = {
  label: string;
  optional?: boolean;
  children: React.ReactNode;
};

export default function UserReviewField({
  label,
  optional = false,
  children,
}: UserReviewFieldProps) {
  return (
    <div className="flex flex-col gap-[8px]">
      <label>
        {label}:
        {optional && <span className="text-gray-400"> (optional)</span>}
      </label>

      {children}
    </div>
  );
}