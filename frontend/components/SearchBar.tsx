"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import SearchBarButton from "@/components/SearchBarButton";
import arrowDownIcon from "@/assets/icons/arrow-down.svg";
import searchIcon from "@/assets/icons/search.svg";

const API = "http://localhost:5012/api/product";

type Product = {
    id: number;
    name?: string;
    title?: string;
};

export default function SearchBar() {
    const router = useRouter();

    const [search, setSearch] = useState("");
    const [products, setProducts] = useState<Product[]>([]);
    const [suggestions, setSuggestions] = useState<Product[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const loadProducts = async () => {
            const res = await fetch(API);

            if (!res.ok) return;

            const data = await res.json();
            setProducts(data);
        };

        loadProducts();
    }, []);

    useEffect(() => {
        const query = search.trim().toLowerCase();

        if (!query) {
            setSuggestions([]);
            setIsOpen(false);
            return;
        }

        const filtered = products
            .filter((product) => {
                const title = product.name || product.title || "";

                return title.toLowerCase().includes(query);
            })
            .slice(0, 6);

        setSuggestions(filtered);
        setIsOpen(filtered.length > 0);
    }, [search, products]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const query = search.trim();

        if (!query) return;

        router.push(`/catalog?search=${encodeURIComponent(query)}`);
        setIsOpen(false);
    };

    const handleSelect = (product: Product) => {
        router.push(`/product/${product.id}`);
        setIsOpen(false);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="relative w-full flex items-center text-light h-10"
        >
            <SearchBarButton
                icon={arrowDownIcon}
                label="All"
                className="bg-button-header-dark"
                iconHeight={3}
                iconWidth={6}
                hiddenOnMobile
            />

            <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => {
                    if (suggestions.length > 0) setIsOpen(true);
                }}
                className="h-full w-full bg-input-header-surface border-none outline-none px-[10px] text-[14.3px] leading-none"
                type="text"
                aria-label="Search"
                placeholder="Search"
            />

            <SearchBarButton
                icon={searchIcon}
                className="bg-button-header-light"
            />

            {isOpen && (
                <div className="absolute left-0 right-0 top-[44px] z-50 bg-white text-black rounded-[8px] shadow-lg overflow-hidden">
                    {suggestions.map((product) => {
                        const title = product.name || product.title || "Untitled product";

                        return (
                            <button
                                key={product.id}
                                type="button"
                                onMouseDown={() => handleSelect(product)}
                                className="w-full text-left px-[12px] py-[10px] text-[14px] hover:bg-gray-100"
                            >
                                {title}
                            </button>
                        );
                    })}
                </div>
            )}
        </form>
    );
}