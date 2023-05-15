import Link from 'next/link';
import React, { FC } from 'react';
import clsx from 'clsx';
import { MdArrowForward, MdArrowBack } from 'react-icons/md';

type PaginationProps = {
  currentPage: number;
  totalCountOfUser: number;
  limit: number;
};

export const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalCountOfUser,
  limit: limitUserOnPage,
}) => {
  const countOfPages: number = Math.ceil(totalCountOfUser / limitUserOnPage);

  const getPaginationData = (currentPage, countOfPages) => {
    const ellipsis: string = '...';

    if (currentPage <= 3) {
      return [
        ...Array.from({ length: 5 }, (_, i) => ++i),
        ellipsis,
        countOfPages,
      ];
    }

    if (currentPage >= countOfPages - 2) {
      return [
        1,
        ellipsis,
        ...Array.from({ length: 5 }, (_, i) => countOfPages - 4 + i),
      ];
    }

    return [
      1,
      ellipsis,
      ...Array.from({ length: 3 }, (_, i) => currentPage + i),
      ellipsis,
      countOfPages,
    ];
  };

  const paginationData = getPaginationData(currentPage, countOfPages);

  return (
    <nav>
      <div className="flex gap-2 justify-center">
        <Link
          href={`/users?page=${Math.max(currentPage, 1)}`}
          className="w-10 h-10 flex items-center justify-center border rounded-md text-base"
        >
          <MdArrowBack />
        </Link>
        {paginationData.map((pageNumber, index) => (
          <div className="inline-block w-10" key={index}>
            {pageNumber !== '...' ? (
              <Link
                className={clsx(
                  'w-10 p-2 block text-center border rounded-md text-base',
                  pageNumber - 1 === currentPage
                    ? 'bg-violet-200'
                    : 'hover:bg-violet-100',
                )}
                href={`/users?page=${pageNumber}`}
              >
                {pageNumber}
              </Link>
            ) : (
              <div className="w-10 p-2 block text-center cursor-default text-base">
                {pageNumber}
              </div>
            )}
          </div>
        ))}
        <Link
          href={`/users?page=${Math.min(currentPage + 2, countOfPages)}`}
          className="w-10 h-10 flex items-center justify-center border rounded-md text-base"
        >
          <MdArrowForward />
        </Link>
      </div>
    </nav>
  );
};
