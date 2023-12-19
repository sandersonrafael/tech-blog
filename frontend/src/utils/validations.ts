import validator from 'validator';

class Validations {
  public email(email: string = ''): string[] {
    const errors: string[] = [];

    if (email.length === 0) errors.push('E-mail não pode estar em branco');
    else if (!validator.isEmail(email)) errors.push('E-mail inválido');

    return errors;
  }

  public password(password: string = '', denomination: string): string[] {
    const errors: string[] = [];

    if (password.length === 0) {
      errors.push(`${denomination} não pode estar em branco`);
      return errors;
    }

    if (password.length < 4 || password.length > 24)
      errors.push(`${denomination} deve conter de 4 a 24 caracteres`);

    if (password.indexOf(' ') !== -1) errors.push(`${denomination} não pode conter espaços`);

    if (
      !password.match(/[a-z]/g) ||
      !password.match(/[A-Z]/g) ||
      !password.match(/[0-9]/g) ||
      !password.match(/[\W]/g)
    ) errors.push(`${denomination} deve conter letras maiúsculas, minúsculas, números e símbolos`);

    return errors;
  }

  public name(name: string = '', denomination: string): string[] {
    const errors: string[] = [];

    if (name.length < 2) errors.push(`${denomination} não pode conter menos de 2 caracteres`);
    if (name.match(/[0-9]/g)) errors.push(`${denomination} não pode conter números`);
    if (name !== name.trim())
      errors.push(`${denomination} não pode iniciar ou finalizar com espaços em branco`);

    return errors;
  }

  public image(image: string): string[] {
    const errors: string[] = [];

    if (image === '') return errors;

    if (!validator.isURL(image)) errors.push('Url de imagem inválido');
    if (image.indexOf('.png') === -1 && image.indexOf('.jpg') === -1 && image.indexOf('.jpeg') === -1) {
      errors.push('Formato de imagem inválido. Somente são aceitas imagens dos formatos png, jpeg ou jpg');
    }

    return errors;
  }

  public confirmPassword(password: string = '', repeatPassword: string = '', firstTerm: string, secondTerm: string): string[] {
    const errors: string[] = [];

    if (repeatPassword.length === 0)
      errors.push(`${secondTerm} não pode estar em branco`);
    else if (repeatPassword !== password) errors.push(`${firstTerm} e ${secondTerm.toLowerCase()} não conferem`);

    return errors;
  }

  public phone(phone: string = ''): string[] {
    const errors: string[] = [];

    if (phone.length === 0) {
      errors.push('Número não pode estar vazio');
      return errors;
    }
    if (phone.length !== 11) {
      errors.push('Número inválido');
      return errors;
    }
    if (Number(phone.slice(0, 2)) <= 10) errors.push('DDD inválido');
    if (phone.charAt(2) !== '9') errors.push('Dígito 9 faltando');

    return errors;
  }

  public message(message: string = ''): string[] {
    const errors: string[] = [];

    if (message.length < 20) errors.push('Mensagem precisa conter ao menos 20 caracteres');
    if (message.length > 0 && message.trim() === '') errors.push('Mensagem não pode conter apenas espaços em branco');
    else if (message.trim() !== message) errors.push('Mensagem não pode iniciar ou finalizar com espaços em branco');
    if (message.match(/[0-9]/g) && message.replaceAll(/[0-9]/g, '') === '') {
      errors.push('Não é permitido informar somente números');
    }

    return errors;
  }
}

const validations = new Validations();

export default validations;
