import Link from 'next/link';
import React, { FC } from 'react';
import clsx from 'clsx';
import { MdArrowForward, MdArrowBack } from 'react-icons/md';

type PaginationProps = {
  currentPage: number;
};

export const Pagination: FC<PaginationProps> = ({ currentPage }) => {
  const countOfPages: number = 10;

  // const totalPages = Number(total) / Number(limit);

  const getPaginationData = (currentPage, countOfPages) => {
    const ellipsis: string = '...';

    if (currentPage <= 3) {
      return [
        ...Array.from({ length: countOfPages / 2 }, (_: number, i) => ++i),
        ellipsis,
        countOfPages,
      ];
    }

    if (
      currentPage >= countOfPages / 2 - 1 &&
      currentPage <= countOfPages / 2 + 1
    ) {
      return [
        1,
        ellipsis,
        ...Array.from({ length: 3 }, (_: number, i) => currentPage + i),
        ellipsis,
        countOfPages,
      ];
    }

    if (currentPage >= 5) {
      return [
        1,
        ellipsis,
        ...Array.from(
          { length: countOfPages / 2 },
          (_, i) => countOfPages / 2 + 1 + i,
        ),
      ];
    }
  };

  const paginationData = getPaginationData(currentPage, countOfPages);

  return (
    <nav>
      <div className="flex gap-2 justify-center">
        <Link
          href={`/users?page=${Math.max(currentPage, 0)}`}
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
