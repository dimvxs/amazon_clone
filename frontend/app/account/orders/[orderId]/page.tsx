import FormButton from "@/components/FormButton";

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;

  return (
    <div className="flex flex-col gap-[20px]">
      <h3 className="text-section-title">Order details</h3>

      <div className="flex flex-col gap-[10px]">
        <InfoRow label="Order date" value="March 2, 2025" />
        <InfoRow label="Order number" value={`#${orderId}`} />
        <InfoRow label="Order total" value="12.99$" />
      </div>

      <h3 className="text-section-title">Shipment</h3>
      <InfoRow
        label="Delivery estimate"
        value="Thursday, March 4, 2025 by 5pm"
      />
      <div className="bg-gray-200 rounded-[10px] flex p-[10px] gap-[8px]">
        <div className="w-[105px] h-[105px] rounded-[10px] shrink-0 bg-gray-300 flex items-center justify-center">
          Image
        </div>
        <div className="flex flex-col justify-between flex-1 text-default gap-[20px]">
          <span className="font-normal text-[16px] leading-[28px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </span>

          <span className="flex items-center gap-[2px] self-end">
            <span className="font-normal text-[27.9px] leading-[100%]">
              12.99
            </span>
            <span className="font-normal text-[16px]">$</span>
          </span>
        </div>
      </div>

      <h3 className="text-section-title">Payment information</h3>

      <div className="flex flex-col gap-[10px] text-gray-300">
        <span>Alina Florentina</span>
        <span>Credit card Visa - 5449</span>
        <span>10/31</span>
      </div>

      <FormButton type="button" className="!px-[10px]">
        Contact Seller
      </FormButton>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex">
      <span className="min-w-[125px] text-gray-300">{label}</span>
      <span>{value}</span>
    </div>
  );
}
