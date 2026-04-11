import DropdownContainer from "./DropdownContainer";

export default function FiltersMobile() {
  const categories = ["Mobile Phones",
    "Laptops & Notebooks",
    "Tablets & eReaders",
    "Smart Watches & Wearables",
    "Headphones & Earbuds",
    "Speakers & Audio Systems",
    "Gaming Consoles",
    "PC Components",
    "Computer Accessories",
    "Cameras & Photography",
    "Smart Home Devices",
    "Storage Devices",
    "Networking Equipment"];

  return (
    <div className="flex gap-[18px] overflow-x-auto px-[21px] no-scrollbar">
      <DropdownContainer label="Department">
        {categories.map((c) => (
          <div key={c}>{c}</div>
        ))}
      </DropdownContainer>
      <DropdownContainer label="Department">
        {categories.map((c) => (
          <div key={c}>{c}</div>
        ))}
      </DropdownContainer>
      <DropdownContainer label="Test Section">
        <div>Test</div>
      </DropdownContainer>
    </div>
  );
}
