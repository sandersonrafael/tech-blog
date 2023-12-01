export type LoginErrors = {
  emailErrors: string[];
  passwordErrors: string[];
};

export type RegistrationErrors = {
  firstNameErrors: string[];
  lastNameErrors: string[];
  emailErrors: string[];
  passwordErrors: string[];
  repeatPasswordErrors: string[];
};

export type RecoverPasswordErrors = {
  emailErrors: string[];
};
