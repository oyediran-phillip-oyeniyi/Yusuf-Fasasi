'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath?: string;
  pageParam?: string; // Add this to make param name dynamic
  hasMorePages?: boolean; // Add this prop
}

const CoinsPagination = ({ 
  currentPage, 
  totalPages, 
  basePath = '/',
  pageParam = 'page', // Default to 'page'
  hasMorePages = false,
}: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(pageParam, page.toString()); // Use dynamic param name
    router.push(`${basePath}?${params.toString()}`);
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showPages = 5;

    if (totalPages <= showPages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      pages.push(totalPages);
    }

    return pages;
  };

  // Disable next button if we're at total pages AND there's no more data
  const isNextDisabled = currentPage === totalPages && !hasMorePages;

  return (
    <div id="coins-pagination" className="mt-5 pb-5">
      <div className="pagination-content">
        {/* Previous Button */}
        <div className={`pagination-control prev ${currentPage === 1 ? 'control-disabled' : ''}`}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="control-button p-2"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        {/* Page Numbers */}
        <div className="pagination-pages mx-5">
          {getPageNumbers().map((page, index) =>
            page === '...' ? (
              <span key={`ellipsis-${index}`} className="ellipsis">
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => handlePageChange(page as number)}
                className={`page-link px-4 ${currentPage === page ? 'page-link-active' : ''}`}
              >
                {page}
              </button>
            ),
          )}
        </div>

        {/* Next Button */}
        <div
          className={`pagination-control next ${isNextDisabled ? 'control-disabled' : ''}`}
        >
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={isNextDisabled}
            className="control-button p-2"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoinsPagination;