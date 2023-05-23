export type User = {
  id: number;
  firstName: string;
  lastName: string;
  image: string;
  address: Address;
  age: string;
  weight: string;
  height: string;
};

export type GetUsers = {
  users: User[];
  total: number;
};

export type Address = {
  address: string;
  city: string;
  postalCode: string;
  state: string;
};

export type UserPageProps = {
  user: User | null;
  error?: string;
};
