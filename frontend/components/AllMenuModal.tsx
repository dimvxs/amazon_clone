"use client";

import CategoryItem from "./CategoryItem";
import ImageCard from "./ImageCard";
import MenuSection from "./MenuSection";

const categories = [
  "Electronics",
  "Accessories",
  "Home & Lighting",
  "Arts & Crafts",
  "Beauty and Personal Care",
  "Women’s Fashion",
  "Men’s Fashion",
  "Kitchen",
  "Sports and Outdoors",
];
const menuData = [
  {
    title: "Computers & Accessories",
    items: [
      "Laptops",
      "Desktop PCs",
      "Monitors",
      "Keyboards & Mice",
      "Webcams",
      "External Storage (SSD, HDD)",
    ],
  },
  {
    title: "Audio",
    items: [
      "Headphones",
      "Wireless Earbuds",
      "Speakers",
      "Soundbars",
      "Microphones",
    ],
  },
  {
    title: "Gaming",
    items: [
      "Gaming Consoles",
      "Controllers",
      "Gaming Headsets",
      "Gaming Keyboards",
      "VR Headsets",
      "Accessories",
    ],
  },
  {
    title: "Smart Home",
    items: [
      "Smart Lights",
      "Smart Plugs",
      "Security Cameras",
      "Smart Locks",
      "Voice Assistants",
      "Thermostats",
    ],
  },
  {
    title: "Mobile Devices",
    items: [
      "Smartphones",
      "Tablets",
      "Smartwatches",
      "Phone Cases",
      "Screen Protectors",
      "Chargers & Cables",
      "Power Banks",
    ],
  },
  {
    title: "Cameras & Photo",
    items: [
      "Digital Cameras",
      "Action Cameras",
      "Camera Lenses",
      "Tripods",
      "Webcams",
      "Lighting Equipment",
      "Memory Cards",
    ],
  },
  {
    title: "TV & Home Entertainment",
    items: [
      "Smart TVs",
      "Streaming Devices",
      "Sound Systems",
      "Projectors",
      "TV Mounts",
    ],
  },
  {
    title: "Wearable Tech",
    items: [
      "Fitness Trackers",
      "Smart Glasses",
      "Health Devices",
      "Wearable Accessories",
    ],
  },
  {
    title: "Networking",
    items: [
      "Routers",
      "Modems",
      "Wi-Fi Extenders",
      "Network Switches",
      "Ethernet Cables",
      "Access Points",
    ],
  },
];

const items = Array.from({ length: 8 });

export default function AllMenuModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute top-full left-0 w-full p-4 flex gap-4">
      <div className="bg-main w-[clamp(130px,50vw,400px)] max-h-[700px] rounded-[24px] overflow-hidden pr-[16px]">
        <div
          className="h-full overflow-y-auto py-[30px] custom-scrollbar"
          style={{ "--scrollbar-track-margin": "30px" } as React.CSSProperties}
        >
          <ul className="flex flex-col gap-[26px]">
            {categories.map((item) => (
              <CategoryItem key={item} label={item} />
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-main w-full max-h-[700px] rounded-[24px] flex flex-col overflow-hidden ">
        <div className="bg-non-active px-[30px] pt-[30px] pb-[10px] shrink-0">
          <span className="font-semibold text-[24px] leading-[28px]">
            Recommended
          </span>

          <div className="grid grid-cols-[repeat(auto-fit,_minmax(80px,_1fr))] gap-[12px] w-full mt-4">
            {items.map((_, index) => (
              <ImageCard key={index} label="Laptops" />
            ))}
          </div>
        </div>
        <div
          className="flex-1 overflow-y-auto custom-scrollbar px-[30px] pt-[10px] pb-[30px] columns-1 md:columns-2 lg:columns-3 xl:columns-5 gap-6 mr-[10px]"
          style={{ "--scrollbar-track-margin": "14px" } as React.CSSProperties}
        >
          {menuData.map((section) => (
            <MenuSection
              key={section.title}
              title={section.title}
              items={section.items}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
