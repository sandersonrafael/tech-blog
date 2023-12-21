import { RegistrationErrors, LoginErrors, RecoverPasswordErrors, NewPasswordErrors, ChangePasswordErrors } from '../ValidationErrors';
import ApiError from './ApiError';

export type RegisterSuccess = {
  success: string;
};

export type RegisterValidationErrors = {
  errors: RegistrationErrors;
};

export type RegisterServerError = {
  error: ApiError;
};

export type LoginSuccess = {
  success: string;
};

export type LoginValidationErrors = {
  errors: LoginErrors;
};

export type LoginServerError = {
  error: ApiError;
};

export type RecoverSuccess = {
  success: string;
};

export type RecoverValidationErrors = {
  errors: RecoverPasswordErrors;
};

export type RecoverServerError = {
  error: ApiError;
};

export type NewPasswordSuccess = {
  success: string;
};

export type NewPasswordValidationErrors = {
  errors: NewPasswordErrors;
};

export type NewPasswordServerError = {
  error: ApiError;
};

export type ChangePasswordSuccess = {
  success: string;
};

export type ChangePasswordValidationErrors = {
  errors: ChangePasswordErrors;
};

export type ChangePasswordServerError = {
  error: ApiError;
};
