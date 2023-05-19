import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Pagination } from '../../components/Pagination';
import { SearchWidget } from '../../components/SearchWidget';
import Image from 'next/image';
import Link from 'next/link';
import { User, GetUsers } from '../../types';

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [totalCountOfUser, setTotalCountOfUser] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const page = router.query.page;
  const pageToNum = Number(page ?? '1');
  const limitUserOnPage = 10;
  const countOfPages: number = Math.ceil(totalCountOfUser / limitUserOnPage);

  useEffect(() => {
    // if (page) {
    const pageNum: number = pageToNum - 1;
    const skipUsersOnApi = pageNum * limitUserOnPage;
    const getUsers = async (): Promise<GetUsers> => {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_BASE_API_URL as string,
        {
          params: { limit: limitUserOnPage, skip: skipUsersOnApi },
        },
      );
      setUsers(response.data.users);
      setTotalCountOfUser(response.data.total);
      setCurrentPage(pageNum);
      return { users: response.data.users, total: response.data.total };
    };

    getUsers();
    // };
  }, [page]);

  return (
    <div className="h-screen flex flex-col p-20 bg-white">
      <SearchWidget />
      <div className="mb-12 flex-1">
        <ul className="grid gap-6 grid-cols-5 grid-rows-2">
          {users.map((user) => (
            <li
              key={user.id}
              className="py-4 px-6 flex flex-col justify-center items-center border border-gray-200 rounded-lg p-8 drop-shadow-md hover:saturate-200 hover:scale-105 w-full"
            >
              <Link
                href={`/user/${user.id}`}
                className="flex flex-wrap items-center flex-col w-full"
              >
                <Image
                  priority={true}
                  src={user.image}
                  alt={`${user.firstName} ${user.lastName}`}
                  width={150}
                  height={150}
                  className="h-30 w-30 mb-6 self-center flex-1"
                />
                <div className="ml-3 flex flex-wrap items-center gap-2 flex-1">
                  <p className="text-base font-medium text-gray-900 flex-shrink-0">
                    {user.firstName}
                  </p>
                  <p className="text-base font-medium text-gray-900 flex-shrink-0">
                    {user.lastName}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Pagination
        currentPage={currentPage}
        countOfPages={countOfPages}
        pageToNum={pageToNum}
      />
    </div>
  );
};

export default Users;
