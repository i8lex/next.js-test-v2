import Link from 'next/link';
import React, { FC } from 'react';
import clsx from 'clsx';
// import { PaginationProps } from "../type";

type PaginationProps = {
  currentPage: number;
};

export const Pagination: FC<PaginationProps> = ({ currentPage }) => {
  const countOfPages: number = 10;
  // const totalPages = Number(total) / Number(limit);

  const pageNumbers = Array.from({ length: countOfPages }, (_, i) => ++i);

  return (
    <nav>
      <div className="flex gap-2 justify-center">
        {pageNumbers.map((pageNumber) => (
          <div className="inline-block w-10" key={pageNumber}>
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
          </div>
        ))}
      </div>
    </nav>
  );
};
