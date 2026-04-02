function CartQuantityControl() {
  function ControlButton({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
  }) {
    return (
      <button
        onClick={onClick}
        className="size-[32px] rounded-full bg-gray-200 flex items-center justify-center"
      >
        {children}
      </button>
    );
  }

  return (
    <div className="flex items-center gap-[14px]">
      <ControlButton>-</ControlButton>
      <span>1</span>
      <ControlButton>+</ControlButton>
    </div>
  );
}

export default CartQuantityControl;