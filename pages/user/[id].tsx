import React from 'react';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { UserPageProps } from '@/types';
import Image from 'next/image';

export const getServerSideProps: GetServerSideProps<UserPageProps> = async (
  context,
) => {
  const { id: userId } = context.query;

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/${userId}`,
    );
    const user = response.data;
    return { props: { user } };
  } catch (error) {
    return { props: { user: null } };
  }
};

const UserPage: React.FC<UserPageProps> = ({ user, error }) => {
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      {user ? (
        <div className="flex items-center justify-center h-screen w-full drop-shadow-md bg-white">
          <div className="max-w-7xl w-full flex drop-shadow-md gap-6">
            <div>
              <Image
                priority={true}
                src={user.image}
                alt={`${user.firstName} ${user.lastName}`}
                width={600}
                height={600}
                className="h-30 w-30 flex-1"
              />
            </div>
            <div className=" flex flex-2 gap-4 flex-col justify-end content-start">
              <div className="text-8xl font-large text-gray-900 mb-16 flex flex-col gap-4">
                <p>{user.firstName}</p>
                <p>{user.lastName}</p>
              </div>

              <div className="text-5xl font-medium text-gray-400 flex flex-col gap-4">
                <p>{`${user.address.address},`}</p>
                <p>{`${user.address.postalCode} ${user.address.city}`}</p>
                <p>{`${user.address.state}, USA`}</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default UserPage;
