import Link from 'next/link';
import React, { FC } from 'react';
import clsx from 'clsx';
import { MdArrowForward, MdArrowBack } from 'react-icons/md';
import { getPaginationData } from '@/utils/paginationUtils';

type PaginationProps = {
  currentPage: number;
  countOfPages: number;
  pageToNum: number;
};

export const Pagination: FC<PaginationProps> = ({
  currentPage,
  countOfPages,
  pageToNum,
}) => {
  const paginationData = getPaginationData(pageToNum, countOfPages);

  return (
    <nav>
      <div className="flex gap-2 justify-center">
        {currentPage === 0 ? (
          <div className="w-10 h-10 flex items-center justify-center border rounded-md text-base">
            <MdArrowBack />
          </div>
        ) : (
          <Link
            href={`/users?page=${Math.max(currentPage, 1)}`}
            className="w-10 h-10 flex items-center justify-center border rounded-md text-base"
          >
            <MdArrowBack />
          </Link>
        )}

        {paginationData.items.map((pageNumber, index) => (
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
        {currentPage === countOfPages - 1 ? (
          <div className="w-10 h-10 flex items-center justify-center border rounded-md text-base">
            <MdArrowForward />
          </div>
        ) : (
          <Link
            href={`/users?page=${Math.min(currentPage + 2, countOfPages)}`}
            className="w-10 h-10 flex items-center justify-center border rounded-md text-base"
          >
            <MdArrowForward />
          </Link>
        )}
      </div>
    </nav>
  );
};
