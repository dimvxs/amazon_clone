function CheckCircle({
  checked,
  onClick,
}: {
  checked?: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`size-[28px] rounded-full flex items-center justify-center shrink-0 cursor-pointer ${
        checked ? "bg-surface-accent" : "bg-gray-200"
      }`}
    />
  );
}

export default CheckCircle;