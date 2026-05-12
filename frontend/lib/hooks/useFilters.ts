import { useMemo, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export function useFilters(filters: any[]) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const allowedFilterKeys = useMemo(() => {
    return new Set(filters.map((f) => f.key));
  }, [filters]);

  const selectedFilters = useMemo(() => {
    if (filters.length === 0) {
      return {};
    }
    const result: any = {};
    const tempRanges: any = {};

    searchParams.forEach((value, key) => {
      if (!allowedFilterKeys.has(key.replace(/(_min|_max|_gte)$/, ""))) {
        return;
      }
      if (key.endsWith("_min") || key.endsWith("_max")) {
        const baseKey = key.replace("_min", "").replace("_max", "");

        if (!tempRanges[baseKey]) {
          tempRanges[baseKey] = {};
        }

        if (key.endsWith("_min")) {
          tempRanges[baseKey].min = Number(value);
        }

        if (key.endsWith("_max")) {
          tempRanges[baseKey].max = Number(value);
        }

        return;
      }
      if (key.endsWith("_gte")) {
        const baseKey = key.replace("_gte", "");

        result[baseKey] = {
          type: "rating",
          value: Number(value),
        };

        return;
      }

      if (value.includes(",")) {
        result[key] = {
          type: "multiselect",
          value: value.split(","),
        };
      } else {
        result[key] = {
          type: "single_select",
          value,
        };
      }
    });
    Object.entries(tempRanges).forEach(([key, range]: any) => {
      result[key] = {
        type: "range",
        value: {
          min: range.min,
          max: range.max,
        },
      };
    });

    return result;
  }, [searchParams, filters]);
  const buildFilterQuery = () => {
    const query: any = {};

    Object.entries(selectedFilters).forEach(([key, filter]: any) => {
      if (!filter) return;

      switch (filter.type) {
        case "single_select":
          query[key] = filter.value;
          break;

        case "multiselect":
          query[key] = filter.value.join(",");
          break;

        case "range":
          query[`${key}_min`] = filter.value.min;
          query[`${key}_max`] = filter.value.max;
          break;

        case "rating":
          query[`${key}_gte`] = filter.value;
          break;

        default:
          query[key] = filter.value;
      }
    });

    return query;
  };

  const getNormalizedFilters = () => {
    const result: any = {};

    Object.entries(selectedFilters).forEach(([key, filter]: any) => {
      result[key] = filter?.value ?? filter;
    });

    return result;
  };

  const updateFilter = (key: string, value: any, type: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (type === "single_select") {
      params.set(key, value);
    }

    if (type === "multiselect") {
      const current = params.get(key)?.split(",") || [];

      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];

      if (updated.length === 0) {
        params.delete(key);
      } else {
        params.set(key, updated.join(","));
      }
    }

    if (type === "range") {
      params.set(`${key}_min`, value[0]);
      params.set(`${key}_max`, value[1]);
    }

    if (type === "rating") {
      params.set(`${key}_gte`, value);
    }

    router.push(`${pathname}?${params.toString()}`);
  };
  const removeFilter = (key: string, value?: any) => {
    const params = new URLSearchParams(searchParams.toString());

    if (selectedFilters[key]?.type === "rating") {
      params.delete(`${key}_gte`);
      router.push(`${pathname}?${params.toString()}`);
      return;
    }
    if (selectedFilters[key]?.type === "range") {
      params.delete(`${key}_min`);
      params.delete(`${key}_max`);
      router.push(`${pathname}?${params.toString()}`);
      return;
    }
    const existing = params.get(key);

    if (!existing) return;

    const values = existing.split(",").filter((v) => v !== value);

    if (values.length === 0) {
      params.delete(key);
    } else {
      params.set(key, values.join(","));
    }

    router.push(`${pathname}?${params.toString()}`);
  };
  const clearFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    Array.from(params.keys()).forEach((key) => {
      const normalizedKey = key.replace(/(_min|_max|_gte)$/, "");

      if (allowedFilterKeys.has(normalizedKey)) {
        params.delete(key);
      }
    });

    router.push(`${pathname}?${params.toString()}`);
  };

  return {
    selectedFilters,
    removeFilter,
    buildFilterQuery,
    allowedFilterKeys,
    getNormalizedFilters,
    updateFilter,
    clearFilters,
  };
}
