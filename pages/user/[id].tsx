import React from "react";
import { GetServerSideProps, NextPage } from "next";
import axios from "axios";
import { UserProps } from "../../type";
import Image from "next/image";

const UserPage: NextPage<UserProps> = ({ user, error }) => {
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      {user && (
        <div className="flex items-center justify-center h-screen w-full drop-shadow-md ">
          <div className="max-w-7xl w-full flex drop-shadow-md gap-6">
            <div>
              <Image
                priority="normal"
                src={user.image}
                alt={`${user.firstName} ${user.lastName}`}
                width={600}
                height={600}
                className="h-30 w-30 flex-1"
              />
            </div>
            <div className=" flex flex-2 gap-4 flex-col justify-end content-start">
              <p className="text-8xl font-large text-gray-900">
                {user.firstName}
              </p>
              <p className="text-8xl font-large text-gray-900 mb-16">
                {user.lastName}
              </p>
              <p className="text-5xl font-medium text-gray-400">{`${user.address.address},`}</p>
              <p className="text-5xl font-medium text-gray-400">{`${user.address.postalCode} ${user.address.city}`}</p>
              <p className="text-5xl font-medium text-gray-400">{`${user.address.state}, USA`}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps<UserProps> = async (
  context
) => {
  const { id: userId } = context.query;

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/${userId}`
    );
    const user = response.data;
    return { props: { user } };
  } catch (error) {
    return { props: { error: error.message } };
  }
};

export default UserPage;
