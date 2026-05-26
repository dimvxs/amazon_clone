import { useEffect, useState } from "react";
import { Category } from "../types/menu";

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch("/data/categories.json")
      .then((res) => res.json())
      .then((json) => setCategories(json.categories));
  }, []);

  return categories;
}