import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Pagination } from '../../components/Pagination';
import { SearchWidget } from '../../components/SearchWidget';
import Image from 'next/image';
import Link from 'next/link';
import { User, GetUsers } from '../../type';

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const page = router.query.page;
  const pageToNum = Number(page);
  const limit = 10;

  useEffect(() => {
    if (!!page) {
      const pageNum: number = pageToNum - 1;
      const skip = pageNum * limit;

      const getUsers = async (): Promise<GetUsers> => {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_BASE_API_URL as string,
          {
            params: { limit, skip },
            string: '',
          },
        );
        setUsers(response.data.users);
        setTotal(response.data.total);
        setCurrentPage(pageNum);
        return { users: response.data.users, total: response.data.total };
      };

      getUsers().catch((error) => {
        console.error(error);
      });
    }
  }, [page]);

  return (
    <div className="h-screen flex flex-col p-20 bg-white">
      <SearchWidget />
      <div className="mb-12 flex-1">
        <ul className="grid gap-6 grid-cols-5 grid-rows-2">
          {users.map(({ id, firstName, lastName, image }) => (
            <li
              key={id}
              className="py-4 px-6 flex flex-col justify-center items-center border border-gray-200 rounded-lg p-8 drop-shadow-md hover:saturate-200 hover:scale-105 w-full"
            >
              <Link
                href={`/user/${id}`}
                className="flex flex-wrap items-center flex-col w-full"
              >
                <Image
                  priority="normal"
                  src={image}
                  alt={`${firstName} ${lastName}`}
                  width={150}
                  height={150}
                  className="h-30 w-30 mb-6 self-center flex-1"
                />
                <div className="ml-3 flex flex-wrap items-center gap-2 flex-1">
                  <p className="text-base font-medium text-gray-900 flex-shrink-0">
                    {firstName}
                  </p>
                  <p className="text-base font-medium text-gray-900 flex-shrink-0">
                    {lastName}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Pagination currentPage={currentPage} total={total} />
    </div>
  );
};

export default Users;