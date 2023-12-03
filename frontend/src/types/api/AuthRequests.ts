export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repeatPassword?: string;
};

export type RecoverRequest = {
  email: string;
};