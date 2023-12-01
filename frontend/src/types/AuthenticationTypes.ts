export type UserLogin = {
  email: string;
  password: string;
};

export type UserRegister = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repeatPassword: string;
};

export type UserRecover = {
  email: string;
};
