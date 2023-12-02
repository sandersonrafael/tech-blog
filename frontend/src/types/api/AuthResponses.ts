import { RegistrationErrors } from '../ValidationErrors';
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
