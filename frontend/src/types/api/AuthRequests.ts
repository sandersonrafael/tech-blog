export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  profileImg: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repeatPassword?: string;
};

export type RecoverRequest = {
  email: string;
};

export type NewPasswordRequest = {
  email: string;
  password: string;
  repeatPassword?: string;
};

export type ChangePasswordRequest = {
  email: string;
  oldPassword: string;
  newPassword: string;
};
