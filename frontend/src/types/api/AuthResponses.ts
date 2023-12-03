import { RegistrationErrors, LoginErrors, RecoverPasswordErrors } from '../ValidationErrors';
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
