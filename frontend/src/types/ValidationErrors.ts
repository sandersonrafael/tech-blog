export type LoginErrors = {
  emailErrors: string[];
  passwordErrors: string[];
};

export type RegistrationErrors = {
  profileImgErrors: string[];
  firstNameErrors: string[];
  lastNameErrors: string[];
  emailErrors: string[];
  passwordErrors: string[];
  repeatPasswordErrors?: string[];
};

export type RecoverPasswordErrors = {
  emailErrors: string[];
};

export type NewPasswordErrors = {
  emailErrors: string[];
  passwordErrors: string[];
  repeatPasswordErrors?: string[];
};

export type ContactErrors = {
  emailErrors: string[];
  phoneErrors: string[];
  nameErrors: string[];
  messageErrors: string[];
};

export type UserErrors = {
  firstNameErrors: string[];
  lastNameErrors: string[];
  profileImgErrors: string[];
};

export type ChangePasswordErrors = {
  emailErrors: string[];
  oldPasswordErrors: string[];
  newPasswordErrors: string[];
};
