import NavButton from "./NavButton";
import PageButton from "./PageButton";
import { buildPagination } from "@/lib/utils/buildPagination";
import { PageItem } from "@/lib/utils/buildPagination";
import PaginationBreak from "./PaginationBreak";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages: PageItem[] = buildPagination(currentPage, totalPages);

  return (
    <div className="flex items-center justify-center w-full h-[48px] ">
      <div className="flex bg-white h-[48px] rounded-[24px] overflow-hidden">
        <NavButton
          direction="prev"
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </NavButton>

        {pages.map((p, i) => {
          if (p.type === "break") {
            return <PaginationBreak key={`break-${i}`} />;
          }
          return (
            <PageButton
              key={p.value}
              active={p.value === currentPage}
              onClick={() => onPageChange(p.value)}
            >
              {p.value}
            </PageButton>
          );
        })}

        <NavButton
          direction="next"
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </NavButton>
      </div>
    </div>
  );
}
