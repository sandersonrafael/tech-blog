import { ContactErrors } from '../ValidationErrors';
import ApiError from './ApiError';

export type ContactSuccess = {
  success: string;
};

export type ContactValidationErrors = {
  errors: ContactErrors;
};

export type ContactServerError = {
  error: ApiError;
};
