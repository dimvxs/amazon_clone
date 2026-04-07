import CheckoutBar from "./CheckoutBar";
import OrderSummary from "./OrderSummary";
import PaymentOptions from "./PaymentOptions";

interface CheckoutDesktopProps {
  itemTotal: number;
  shipping: number;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  total: number;
}

export default function CheckoutDesktop({
  itemTotal,
  setOpen,
  shipping,
  total,
}: CheckoutDesktopProps) {
  return (
    <div className="w-full hidden flex-col gap-[18px] layout-account-sm:w-[373px] layout-account-sm:min-w-[250px] layout-account-sm:flex  ">
      <div className="bg-white flex justify-between gap-[12px] p-[10px] rounded-[10px]">
        <span>Subtotal (1 item):</span>
        <span>1,899.30 $</span>
      </div>
      <div className="bg-white flex flex-col gap-[14px] p-[10px] rounded-[10px] ">
        <OrderSummary itemTotal={itemTotal} shipping={shipping} />
        <CheckoutBar setOpen={setOpen} total={total} />
      </div>
      <div className="bg-white flex flex-col gap-[12px] p-[10px] rounded-[10px]">
        <span>Pay with</span>

        <PaymentOptions />
        <span>Protection</span>
        <span>
          Get a full refund if the item is not as described or not delivered
        </span>
      </div>
    </div>
  );
}
