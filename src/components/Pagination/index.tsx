"use client"

interface PaginationProps {
  total_pages: number;
  current_page: number;
  onChange: (page: number) => void;
}

export default function Pagination({
  current_page,
  total_pages,
  onChange
}: PaginationProps) {
  const handlePageChange = (page: number) => {
    onChange(page);
  }

  return (
    <div className="flex items-center gap-2">
      {
        Array.from({ length: total_pages }, (_, idx) => (
          <div
            key={idx}
            data-active={(idx + 1) === current_page}
            onClick={() => handlePageChange(idx + 1)}
            className="p-1 px-3.5 rounded-md data-[active=true]:bg-blue-light data-[active=true]:text-blue cursor-pointer"
          >
            {idx + 1}
          </div>
        ))
      }
    </div>
  )
}