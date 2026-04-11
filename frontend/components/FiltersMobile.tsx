"use client";

import { useState } from "react";
import DropdownContainer from "./DropdownContainer";
type CategoryListProps = {
  categories: string[];
};

function CategoryList({ categories }: CategoryListProps) {
  return (
    <ul className="flex flex-col gap-[20px]  whitespace-nowrap ">
      {categories.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
export default function FiltersMobile() {
  const [open, setOpen] = useState(false);
  const categories: string[] = [
    "Electronic Devices",
    "Mobile Phones",
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
    "Networking Equipment",
  ];
  return (
    <div className="flex gap-[18px] relative z-50 text-black">
      <DropdownContainer
        label="Department"
        open={open}
        onToggle={() => setOpen((v) => !v)}
      >
        <CategoryList categories={categories} />
      </DropdownContainer>

      <DropdownContainer
        label="Test Element"
        open={open}
        onToggle={() => setOpen((v) => !v)}
      >
        <span>Test</span>
      </DropdownContainer>
    </div>
  );
}
