package com.mystack.techblog.validation;

import java.util.ArrayList;
import java.util.List;

import com.mystack.techblog.entities.auth.ChangePasswordRequest;
import com.mystack.techblog.entities.auth.LoginRequest;
import com.mystack.techblog.entities.auth.RecoverRequest;
import com.mystack.techblog.entities.auth.RegisterRequest;
import com.mystack.techblog.entities.dtos.UserDTO;
import com.mystack.techblog.entities.email.ContactRequest;
import com.mystack.techblog.entities.messages.ValidationErrors;

public class ApplicationValidator {

    public static ValidationErrors validateRegisterRequest(RegisterRequest data) {
        ValidationErrors errors = new ValidationErrors();

        List<String> emailErrors = validateEmail(data.email());
        List<String> firstNameErrors = validateName(data.firstName());
        List<String> lastNameErrors = validateName(data.lastName());
        List<String> profileImgErrors = data.profileImg() != null && !data.profileImg().isBlank()
            ? validateUserImg(data.profileImg()) : null;
        List<String> passwordErrors = validatePassword(data.password());

        if (emailErrors != null) errors.addErrors("emailErrors", emailErrors);
        if (firstNameErrors != null) errors.addErrors("firstNameErrors", firstNameErrors);
        if (lastNameErrors != null) errors.addErrors("lastNameErrors", lastNameErrors);
        if (profileImgErrors != null) errors.addErrors("profileImgErrors", profileImgErrors);
        if (passwordErrors != null) errors.addErrors("passwordErrors", passwordErrors);

        return errors.getErrors().size() > 0 ? errors : null;
    }

    public static ValidationErrors validateLoginRequest(LoginRequest data) {
        ValidationErrors errors = new ValidationErrors();

        List<String> emailErrors = validateEmail(data.email());
        List<String> passwordErrors = validatePassword(data.password());

        if (emailErrors != null) errors.addErrors("emailErrors", emailErrors);
        if (passwordErrors != null) errors.addErrors("passwordErrors", passwordErrors);

        return errors.getErrors().size() > 0 ? errors : null;
    }

    public static ValidationErrors validateRecoverPasswordRequest(RecoverRequest data) {
        ValidationErrors errors = new ValidationErrors();

        List<String> emailErrors = validateEmail(data.email());

        if (emailErrors != null) errors.addErrors("emailErrors", emailErrors);

        return errors.getErrors().size() > 0 ? errors : null;
    }

    public static ValidationErrors validateUserUpdate(UserDTO dto) {
        ValidationErrors errors = new ValidationErrors();

        List<String> firstNameErrors = validateName(dto.getFirstName());
        List<String> lastNameErrors = validateName(dto.getLastName());
        List<String> profileImgErrors = dto.getProfileImg() != null && !dto.getProfileImg().isBlank()
            ? validateUserImg(dto.getProfileImg()) : null;

        if (firstNameErrors != null) errors.addErrors("firstNameErrors", firstNameErrors);
        if (lastNameErrors != null) errors.addErrors("lastNameErrors", lastNameErrors);
        if (profileImgErrors != null) errors.addErrors("profileImgErrors", profileImgErrors);

        return errors.getErrors().size() > 0 ? errors : null;
    }

    public static ValidationErrors validateChangePassword(ChangePasswordRequest data) {
        ValidationErrors errors = new ValidationErrors();

        List<String> emailErrors = validateEmail(data.email().toLowerCase());
        List<String> oldPasswordErrors = validatePassword(data.oldPassword());
        List<String> newPasswordErrors = validatePassword(data.newPassword());

        if (emailErrors != null) errors.addErrors("emailErrors", emailErrors);
        if (oldPasswordErrors != null) errors.addErrors("oldPasswordErrors", oldPasswordErrors);
        if (newPasswordErrors != null) errors.addErrors("newPasswordErrors", newPasswordErrors);

        return errors.getErrors().size() > 0 ? errors : null;
    }

    public static ValidationErrors validateEmailRequest(ContactRequest data) {
        ValidationErrors errors = new ValidationErrors();

        List<String> emailErrors = validateEmail(data.email());
        List<String> phoneErrors = validatePhone(data.phone());
        List<String> nameErrors = validateName(data.name());
        List<String> messageErrors = validateMessage(data.message());

        if (emailErrors != null) errors.addErrors("emailErrors", emailErrors);
        if (phoneErrors != null) errors.addErrors("phoneErrors", phoneErrors);
        if (nameErrors != null) errors.addErrors("nameErrors", nameErrors);
        if (messageErrors != null) errors.addErrors("messageErrors", messageErrors);

        return errors.getErrors().size() > 0 ? errors : null;
    }

    private static List<String> validateEmail(String email) {
        List<String> emailErrors = new ArrayList<>();

        if (email == null || email.isBlank()) {
            emailErrors.add("E-mail não pode estar vazio");
            return emailErrors;
        }

        if (email != null  && email.indexOf(" ") != -1) emailErrors.add("E-mail não pode conter espaços em branco");

        if (email != null) {
            String[] splitAt = email.split("@");
            if (splitAt.length == 2) {
                String[] splitDot = splitAt[1].split("\\.");

                if (splitDot.length >= 2) {

                    for (String string : splitDot) {

                        if (string.length() < 2) {
                            emailErrors.add("E-mail inválido.");
                            break;
                        }
                    }
                } else emailErrors.add("E-mail inválido");
            } else emailErrors.add("E-mail inválido");
        }

        return emailErrors.size() != 0 ? emailErrors : null;
    }

    private static List<String> validateName(String name) {
        List<String> nameErrors = new ArrayList<>();

        if (name == null || name.isBlank()) {
            nameErrors.add("Campo não pode estar vazio");
            return nameErrors;
        }
        if (name.matches(".*\\d.*")) nameErrors.add("Campo não pode conter números");
        if (name != null && name.length() < 2) nameErrors.add("Campo não pode conter menos que 2 caracteres");
        if (name != null && name.indexOf("  ") != -1) nameErrors.add("Campo não pode conter múltiplos espaços vazios");
        if (name != null && name.indexOf(" ") == 0 || name.indexOf(" ") == (name.length() - 1))
            nameErrors.add("Campo não pode iniciar ou finalizar com espaços em branco");

        return nameErrors.size() != 0 ? nameErrors : null;
    }

    private static List<String> validatePassword(String password) {
        List<String> passwordErrors = new ArrayList<>();

        if (password == null) {
            passwordErrors.add("Senha deve ser informada");
            return passwordErrors;
        }

        if (password != null && (password.length() < 4 || password.length() > 24)) {
            passwordErrors.add("Senha deve conter entre 4 e 24 caracteres");
        }

        if (password != null && password.indexOf(" ") != -1) passwordErrors.add("Senha não pode conter espaços em branco");
        if (password != null && !password.matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*\\W).*$")) {
            passwordErrors.add("Senha precisa conter maiúsculas, minúsculas, números e símbolos");
        }

        return passwordErrors.size() != 0 ? passwordErrors : null;
   }

    private static List<String> validateUserImg(String imgPath) {
        List<String> profileImgErrors = new ArrayList<>();

        if (imgPath == null) {
            profileImgErrors.add("Imagem deve ser informada mesmo que em branco");
            return profileImgErrors;
        }

        if (imgPath != null && imgPath.contains(" ")) profileImgErrors.add("Imagem não pode conter espaços em branco");

        return profileImgErrors.size() != 0 ? profileImgErrors : null;
    }

    private static List<String> validatePhone(String phone) {
        List<String> phoneErrors = new ArrayList<>();

        if (phone == null || phone.isBlank()) {
            phoneErrors.add("Celular não pode estar vazio");
            return phoneErrors;
        }

        if (phone.length() != 11) {
            phoneErrors.add("Celular inválido");
            return phoneErrors;
        }

        if (Integer.parseInt(phone.substring(0, 2)) <= 10) phoneErrors.add("DDD inválido");
        if (phone.charAt(2) != '9') phoneErrors.add("Dígito 9 faltando");

        return phoneErrors.size() > 0 ? phoneErrors : null;
    }

    private static List<String> validateMessage(String message) {
        List<String> messageErrors = new ArrayList<>();

        if (message == null) {
            messageErrors.add("Mensagem não pode estar vazia");
            return messageErrors;
        }

        if (message.length() < 20) messageErrors.add("Mensagem precisa conter ao menos 20 caracteres");
        if (message.length() > 0 && message.trim() == "") messageErrors.add("Mensagem não pode conter apenas espaços em branco");
        else if (message.trim() != message) messageErrors.add("Mensagem não pode iniciar ou finalizar com espaços em branco");
        if (message.matches("\\d+")) messageErrors.add("Não é permitido informar somente números");

        return messageErrors.size() > 0 ? messageErrors : null;
    }
}
