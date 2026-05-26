import { useEffect, useState } from "react";
import {
  Category,
  RecommendedItem,
} from "../types/menu";

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [recommended, setRecommended] = useState<
    RecommendedItem[]
  >([]);

  useEffect(() => {
    fetch("/data/categories.json")
      .then((res) => res.json())
      .then((json) => {
        setCategories(json.categories);
        setRecommended(json.recommended);
      });
  }, []);

  return {
    categories,
    recommended,
  };
}