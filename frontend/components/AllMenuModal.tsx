"use client";
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

export default function AllMenuModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute top-full left-0 w-full p-4">
      <div className="flex min-h-[300px] gap-5 w-full">
        <div className="bg-white w-[400px] min-w-[200px]">
          <ul className="flex flex-col">
            {categories.map((item) => (
              <li
                key={item}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white w-full min-w-0 p-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {menuData.map((section) => (
              <div key={section.title}>
                <h3 className="font-semibold mb-2">{section.title}</h3>

                <ul className="space-y-1">
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className="text-sm text-gray-700 hover:text-black cursor-pointer"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
