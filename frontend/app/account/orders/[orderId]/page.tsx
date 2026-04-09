import FormButton from "@/components/FormButton";
import Image from "next/image";
async function getOrder() {
  const res = await fetch("http://localhost:3000/data/order-details.json", {
    cache: "no-store",
  });
  return res.json();
}

export default async function OrderDetailsPage({}: {
  params: { orderId: string };
}) {
  const order = await getOrder();

  return (
    <div className="flex flex-col gap-[20px]">
      <h3 className="text-section-title">Order details</h3>

      <div className="flex flex-col gap-[10px]">
        <InfoRow label="Order date" value={order.date} />
        <InfoRow label="Order number" value={`#${order.orderNumber}`} />
        <InfoRow label="Order total" value={`$${order.total}`} />
      </div>

      <h3 className="text-section-title">Shipment</h3>
      <InfoRow label="Delivery estimate" value={order.deliveryEstimate} />
      <div className="bg-white rounded-[10px] flex p-[10px] gap-[8px] max-w-[615px]">
        <div className="size-[105px] rounded-[10px] shrink-0 bg-gray-300 relative overflow-hidden">
          <Image
            src={order.item.image}
            alt={order.item.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-between flex-1 text-default gap-[20px]">
          <span className="font-normal text-[16px] leading-[28px]">
            {order.item.title}
          </span>

          <span className="flex items-center gap-[2px] self-end">
            <span className="font-normal text-[27.9px] leading-[100%]">
              {order.item.price}
            </span>
            <span className="font-normal text-[16px]">$</span>
          </span>
        </div>
      </div>

      <h3 className="text-section-title">Payment information</h3>

      <div className="flex flex-col gap-[10px] text-gray-300">
        <span>{order.payment.name}</span>
        <span>{order.payment.method}</span>
        <span>{order.payment.expiry}</span>
      </div>
      <FormButton type="button" className="!px-[10px]">
        Contact Seller
      </FormButton>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex gap-[10px]">
      <span className="min-w-[125px] text-text-main-muted">{label}</span>
      <span className="text-text-main">{value}</span>
    </div>
  );
}
