import { useState } from "react";

export function useFilters() {
  const [selectedFilters, setSelectedFilters] = useState<any>({});

 const getNormalizedFilters = () => {
  const result: any = {};

  Object.entries(selectedFilters).forEach(([key, filter]: any) => {
    result[key] = filter?.value ?? filter;
  });

  return result;
};

  const updateFilter = (key: string, value: any, type: string) => {
    setSelectedFilters((prev: any) => {
      const next = { ...prev };

      if (type === "single_select") {
        next[key] = { type, value };
      }

      if (type === "multiselect") {
        const current = next[key]?.value || [];

        const updated = current.includes(value)
          ? current.filter((v: string) => v !== value)
          : [...current, value];

        next[key] = { type, value: updated };
      }

      if (type === "range") {
        next[key] = {
          type,
          value: {
            min: value[0],
            max: value[1],
          },
        };
      }

      if (type === "rating") {
        next[key] = { type, value };
      }

      return next;
    });
  };

  const removeFilter = (key: string, value?: any) => {
    setSelectedFilters((prev: any) => {
      const next = { ...prev };
      const current = next[key];

      if (!current) return next;

      if (Array.isArray(current.value)) {
        const updated = current.value.filter((v: any) => v !== value);

        if (updated.length === 0) {
          const { [key]: _, ...rest } = next;
          return rest;
        }

        next[key] = { ...current, value: updated };
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
    getNormalizedFilters,
    updateFilter,
    clearFilters,
  };
}
