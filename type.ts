export type User = {
  id: number;
  firstName: string;
  lastName: string;
  image: string;
  address: Address;
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
  user?: User;
  error?: string;
};
