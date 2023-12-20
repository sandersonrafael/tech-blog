import { UserErrors } from '../ValidationErrors';
import ApiError from './ApiError';

export type UserDetailsServerError = {
  error: ApiError;
};

export type UserSuccess = {
  success: string;
};

export type UserValidationErrors = {
  errors: UserErrors;
};

export type UserServerError = {
  error: ApiError;
};
