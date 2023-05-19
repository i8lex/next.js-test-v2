import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { User, GetUsers } from '../../types';

const sortTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();
  const sortBy = router.query.sortBy;
  const sortOrder = router.query.sortOrder;
  const limitUserOnPage = 100;

  const handleSort = (sortBy) => {
    let newSortOrder;
    if (sortBy === router.query.sortBy) {
      newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      newSortOrder = 'asc';
    }

    router.push({
      pathname: process.env.BASE_API_URL,
      query: { sortBy: sortBy, sortOrder: newSortOrder },
    });
  };

  useEffect(() => {
    const getUsers = async (): Promise<GetUsers> => {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_BASE_API_URL as string,
        {
          params: { limit: limitUserOnPage },
        },
      );

      if (sortBy === 'age') {
        if (sortOrder === 'desc') {
          console.log(sortOrder);
          setUsers(response.data.users.sort((a, b) => a.age - b.age));
        }
        if (sortOrder === 'asc') {
          setUsers(response.data.users.sort((a, b) => b.age - a.age));
        }
      } else if (sortBy === 'weight') {
        if (sortOrder === 'desc') {
          setUsers(response.data.users.sort((a, b) => a.weight - b.weight));
        }
        if (sortOrder === 'asc') {
          setUsers(response.data.users.sort((a, b) => b.weight - a.weight));
        }
      } else if (sortBy === 'height') {
        if (sortOrder === 'desc') {
          setUsers(response.data.users.sort((a, b) => a.height - b.height));
        }
        if (sortOrder === 'asc') {
          setUsers(response.data.users.sort((a, b) => b.height - a.height));
        }
      } else {
        setUsers(response.data.users);
      }
    };
    getUsers();
  }, [sortBy, sortOrder]);

  return (
    <div className="h-screen flex flex-col p-20 bg-white">
      <div className="mb-12 flex-1 justify-center">
        <div className="container flex justify-center">
          <table className="min-w-full text-left">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-2 px-4 border-b">NAME</th>
                <th
                  onClick={() => handleSort('age')}
                  className="py-2 px-4 border-b"
                >
                  AGE
                </th>
                <th
                  onClick={() => handleSort('weight')}
                  className="py-2 px-4 border-b"
                >
                  WEIGHT
                </th>
                <th
                  onClick={() => handleSort('height')}
                  className="py-2 px-4 border-b"
                >
                  HEIGHT
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr className="border-b" key={user.id}>
                  <td className="py-2 px-4">{`${user.firstName} ${user.lastName}`}</td>
                  <td className="py-2 px-4">{user.age}</td>
                  <td className="py-2 px-4">{user.weight}</td>
                  <td className="py-2 px-4">{user.height}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default sortTable;
