import { useState } from "react";

type StepMode = "form" | "card";

export function useEditableList<T>() {
  const [items, setItems] = useState<T[]>([]);
  const [mode, setMode] = useState<StepMode>("card");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const saveItem = (data: T) => {
    setItems((prev) => {
      if (editingIndex !== null) {
        const updated = [...prev];
        updated[editingIndex] = data;
        return updated;
      }
      return [...prev, data];
    });

    setEditingIndex(null);
    setMode("card");
  };

  const editItem = (index: number) => {
    setEditingIndex(index);
    setMode("form");
  };

  const addNew = () => {
    setEditingIndex(null);
    setMode("form");
  };

  return {
    items,
    mode,
    editingIndex,
    setMode,
    saveItem,
    editItem,
    addNew,
  };
}