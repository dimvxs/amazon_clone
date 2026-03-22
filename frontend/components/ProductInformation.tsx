export default function ProductInformation() {
  const productInfo = [
    { label: "Brand", value: "SmartFit" },
    { label: "Model Name", value: "SmartFit Pro X" },
    { label: "Display Size", value: "1.78 inches AMOLED" },
    { label: "Resolution", value: "368 × 448 pixels" },
    { label: "Material", value: "Aluminum Alloy Case, Silicone Strap" },
    { label: "Weight", value: "38 g" },
    { label: "Battery Capacity", value: "300 mAh" },
    { label: "Battery Life", value: "Up to 14 days" },
    { label: "Charging Type", value: "Magnetic Charging Dock" },
    { label: "Water Resistance", value: "5 ATM (50 meters)" },
    { label: "Connectivity", value: "Bluetooth 5.3" },
    { label: "Compatibility", value: "Android 7.0+, iOS 14.0+" },
    { label: "GPS", value: "Built-in GPS + GLONASS" },
    {
      label: "Sensors",
      value: "Heart Rate Sensor, SpO2 Sensor, Accelerometer, Gyroscope",
    },
    { label: "Operating System", value: "SmartFit OS" },
    { label: "Strap Size", value: "Adjustable (140–210 mm wrist)" },
    { label: "Color Options", value: "Black, Silver, Midnight Blue" },
    {
      label: "Included in Box",
      value: "Smartwatch, Charging Cable, User Manual",
    },
    { label: "Warranty", value: "12 Months Manufacturer Warranty" },
  ];
  const infoSections = [
    {
      title: "Warranty & Support",
      content:
        "Product Warranty: 1-year limited manufacturer warranty covering hardware defects and malfunctions under normal use. For warranty information about this product, please click here.",
    },
    {
      title: "Feedback",
      content: "Would you like to tell us about a lower price?",
    },
  ];

  return (
    <section className="text-default flex flex-col w-full layout-product-sm:gap-[140px] gap-[20px] layout-product-sm:flex-row">
      <div className="w-full flex flex-col gap-[24px]">
        <h2 className="text-title-md">Product information</h2>
        <div className="w-full flex flex-col gap-[12px]">
          {productInfo.map((item, index) => (
            <div
              key={index}
              className="flex justify-between w-full border-t py-[4px] gap-[20px]"
            >
              <span className="font-inter font-bold text-[14px] leading-[20px] align-middle">
                {item.label}
              </span>
              <span className="font-inter font-normal text-[14px] leading-[20px] align-middle text-right">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col gap-[10px]">
        {infoSections.map((section, index) => (
          <div key={index} className="flex flex-col gap-[10px]">
            <h3 className="text-title-sm">{section.title}</h3>
            <p className="border-t">{section.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
