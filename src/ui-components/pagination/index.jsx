import PaginationLeftIcon from "../../assets/ui-icons/pagination-icons/pagination_left_arrow.svg?react";
import PaginationRightIcon from "../../assets/ui-icons/pagination-icons/pagination_right_arrow.svg?react";
import classNames from "classnames";
import usePagination from "../../hooks/usePagination";

const Pagination = ({
  totalElements,
  elementsPerPage,
  page,
  onPageChange,
  className='',
}) => {
  const paginationRange = usePagination({
    currentPage: page,
    totalCount: totalElements,
    siblingCount: 1,
    pageSize: elementsPerPage,
  });
  // If there are less than 2 times in pagination range we shall not render the component
  if (page === 0 || paginationRange?.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(page + 1);
  };

  const onPrevious = () => {
    onPageChange(page - 1);
  };

  const lastPage = paginationRange?.[paginationRange?.length - 1];
  return (
    <div className="grid grid-cols-11 sm:grid-cols-3">
      <div
        className={classNames(
          "flex col-span-2 sm:col-span-1 items-center px-0 md:px-6",
          {
            "select-none text-[#CCCCCC] cursor-not-allowed pointer-events-none":
              page === 1,
            "cursor-pointer": page > 1,
          },
          className
        )}
        onClick={onPrevious}
        aria-hidden
      >
        <span
          className={classNames(
            "flex gap-3 sm:gap-4 items-center  text-sm select-none relative",
            { "text-[#4F4F4F] dark:text-[#D1D1D1]": page !== 1 },
            { "text-[#CCCCCC] dark:text-[#3D3D3D]": page === 1 }
          )}
        >
          <PaginationLeftIcon
            className={classNames(`fill-current dark:fill-current`)}
          />
          Previous
        </span>
      </div>
      <div className="flex col-span-8 sm:col-span-1 justify-center gap-4 items-center dark:text-white">
        <li className="text-sm select-none hidden md:block text-[#8F8F8F] whitespace-nowrap">
          Page {page} of {lastPage}
        </li>
        <ul className="flex justify-center items-center dark:text-white">
          {paginationRange?.map((pageNumber, index) => {
            // If the pageItem is a DOT, render the DOTS unicode character
            if (pageNumber === "...") {
              return (
                <li key={pageNumber + index} className="pagination-item dots">
                  &#8230;
                </li>
              );
            }

            // Render our Page Pills
            return (
              <li
                key={pageNumber}
                className={classNames(
                  `px-2 md:px-4 select-none py-2 text-sm md:py-2 rounded-[4px] relative flex items-center ${
                    pageNumber === page
                      ? "bg-[#00D936] text-white"
                      : "cursor-pointer"
                  }`
                )}
                onClick={() => onPageChange(pageNumber)}
                aria-hidden
              >
                {pageNumber}
              </li>
            );
          })}
        </ul>
      </div>
      <div
        className={classNames(
          "flex col-span-1 items-center px-0 md:px-6 justify-end",
          {
            "select-none cursor-not-allowed pointer-events-none":
              page === lastPage,
            "cursor-pointer": page < lastPage,
          },
          className
        )}
        onClick={onNext}
        aria-hidden
      >
        <span
          className={classNames(
            "flex gap-3 sm:gap-4 text-sm items-center select-none relative dark:text-[#D1D1D1]",
            { "text-[#4F4F4F] dark:text-[#D1D1D1]": page !== lastPage },
            { "text-[#CCCCCC] dark:text-[#3D3D3D]": page === lastPage }
          )}
        >
          Next
          <PaginationRightIcon
            className={classNames(`fill-current dark:fill-current`)}
          />
        </span>
      </div>
    </div>
  );
};

export default Pagination;
