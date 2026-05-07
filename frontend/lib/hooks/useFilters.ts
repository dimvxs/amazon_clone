import { useState } from "react";

export function useFilters() {
  const [selectedFilters, setSelectedFilters] = useState<any>({});

  const updateFilter = (key: string, value: any, type: string) => {
    setSelectedFilters((prev: any) => {
      let next = { ...prev };

      if (type === "single_select") {
        next[key] = value;
      }

      if (type === "multiselect") {
        const current = next[key] || [];

        if (current.includes(value)) {
          next[key] = current.filter((v: string) => v !== value);
        } else {
          next[key] = [...current, value];
        }
      }

      if (type === "range") {
        next[key] = {
          min: value[0],
          max: value[1],
        };
      }

      if (type === "rating") {
        next[key] = value;
      }
      return next;
    });
  };
  const removeFilter = (key: string, value?: any) => {
    setSelectedFilters((prev: any) => {
      const next = { ...prev };

      const current = next[key];

      if (Array.isArray(current)) {
        const updated = current.filter((v) => v !== value);

        if (updated.length === 0) {
          const { [key]: _, ...rest } = next;
          return rest;
        }

        next[key] = updated;
        return next;
      }
      const { [key]: _, ...rest } = next;
      return rest;
    });
  };
  const clearFilters = () => {
    setSelectedFilters({});
  };
  return {
    selectedFilters,
    removeFilter,
    updateFilter,
    clearFilters
  };
}
