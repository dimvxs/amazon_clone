export type PageItem = { type: "page"; value: number } | { type: "break" };

export function buildPagination(current: number, total: number): PageItem[] {
  if (total <= 1) return [{ type: "page", value: 1 }];

  const pages = new Set<number>();

  pages.add(1);
  pages.add(total);

  pages.add(current);

  if (current - 1 > 1) pages.add(current - 1);
  if (current + 1 < total) pages.add(current + 1);

  const sorted = Array.from(pages).sort((a, b) => a - b);

  const result: PageItem[] = [];

  for (let i = 0; i < sorted.length; i++) {
    const value = sorted[i];
    const prev = sorted[i - 1];

    if (i > 0 && value - (prev ?? 0) > 1) {
      result.push({ type: "break" });
    }

    result.push({ type: "page", value });
  }

  return result;
}
