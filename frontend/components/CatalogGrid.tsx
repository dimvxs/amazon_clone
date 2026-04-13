type GridProps = {
  children: React.ReactNode;
  className?: string;
  xlCols?: number;
};

export function CatalogGrid({ children, className = "", xlCols }: GridProps) {
  return (
    <div
      className={`
        grid items-stretch gap-x-[10px] gap-y-[18px]
        grid-cols-[repeat(auto-fit,minmax(140px,1fr))]
        layout-catalog-xs:grid-cols-[repeat(auto-fit,minmax(188px,1fr))]
        ${xlCols ? `xl:grid-cols-${xlCols}` : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}