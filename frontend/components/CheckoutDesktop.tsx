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
    <div className="w-full hidden flex-col gap-[18px] layout-account-sm:w-[373px] layout-account-sm:min-w-[280px] layout-account-sm:flex text-black">
      <div className="flex items-center gap-[12px] card-checkout justify-between">
        <span className="checkout-text-lg ">
          Subtotal (1 item):
        </span>
        <span className="whitespace-nowrap cart-price-text">
          1,899.30 $
        </span>
      </div>
      <div className="flex-col gap-[14px] card-checkout">
        <OrderSummary itemTotal={itemTotal} shipping={shipping} />
        <CheckoutBar setOpen={setOpen} total={total} />
      </div>
      <div className="flex-col gap-[12px] card-checkout">
        <span className="checkout-text-md">Pay with</span>

        <PaymentOptions />
        <div className="flex flex-col">
          <span className="checkout-text-md">Protection</span>
          <span>
            Get a full refund if the item is not as described or not delivered
          </span>
        </div>
      </div>
    </div>
  );
}
