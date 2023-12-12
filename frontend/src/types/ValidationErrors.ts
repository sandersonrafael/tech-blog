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
