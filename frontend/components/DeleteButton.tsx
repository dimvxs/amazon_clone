import DeleteIcon from "@/assets/icons/delete.svg?react";

type DeleteButtonProps = {
  onClick?: () => void;
  width?: number;
  height?: number;
};

export default function DeleteButton({
  onClick,
  width = 15,
  height = 17,
}: DeleteButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center text-black"
    >
      <DeleteIcon style={{ width, height }} />
    </button>
  );
}