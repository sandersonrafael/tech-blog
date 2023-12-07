import { LoginErrors, RecoverPasswordErrors, RegistrationErrors } from '@/types/ValidationErrors';
import validations from './validations';
import { LoginRequest, RecoverRequest, RegisterRequest } from '@/types/api/AuthRequests';

class ValidateForm {
  public login(userLogin: LoginRequest): LoginErrors | null {

    const errors: LoginErrors = {
      emailErrors: validations.email(userLogin.email),
      passwordErrors: validations.password(userLogin.password, 'Senha'),
    };

    return Object.values(errors).find((value) => value.length > 0) ? errors : null;
  }

  public register(userRegister: RegisterRequest): RegistrationErrors | null {

    const errors: RegistrationErrors = {
      profileImgErrors: validations.image(userRegister.profileImg),
      firstNameErrors: validations.name(userRegister.firstName, 'Nome'),
      lastNameErrors: validations.name(userRegister.lastName, 'Sobrenome'),
      emailErrors: validations.email(userRegister.email),
      passwordErrors: validations.password(userRegister.password, 'Senha'),
      repeatPasswordErrors: validations.confirmPassword(
        userRegister.password, userRegister.repeatPassword as string, 'Senha', 'Repetição de senha',
      ),
    };

    return Object.values(errors).find((value) => value.length > 0) ? errors : null;
  }

  public recover(userRecover: RecoverRequest): RecoverPasswordErrors | null {

    const errors: RecoverPasswordErrors = {
      emailErrors: validations.email(userRecover.email),
    };

    return errors.emailErrors.length > 0 ? errors : null;
  }
}

const validateForm = new ValidateForm();

export default validateForm;
