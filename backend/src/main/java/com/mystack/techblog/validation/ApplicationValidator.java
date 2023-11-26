package com.mystack.techblog.validation;

import java.util.ArrayList;
import java.util.List;

import com.mystack.techblog.entities.auth.LoginRequest;
import com.mystack.techblog.entities.auth.RecoverRequest;
import com.mystack.techblog.entities.auth.RegisterRequest;
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

    private static List<String> validateEmail(String email) {
        List<String> emailErrors = new ArrayList<>();

        if (email.isBlank() || email == null) emailErrors.add("E-mail não pode estar vazio");

        if (email.indexOf(" ") != -1) emailErrors.add("E-mail não pode conter espaços em branco");

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

        return emailErrors.size() != 0 ? emailErrors : null;
    }

    private static List<String> validateName(String name) {
        List<String> nameErrors = new ArrayList<>();

        if (name == null || name.isBlank()) nameErrors.add("Campo não pode estar vazio");
        if (name.length() < 2) nameErrors.add("Campo não pode conter menos que 2 caracteres");
        if (name.indexOf("  ") != -1) nameErrors.add("Campo não pode conter múltiplos espaços vazios");
        if (name.indexOf(" ") == 0 || name.indexOf(" ") == (name.length() - 1))
            nameErrors.add("Campo não pode iniciar ou finalizar com espaços em branco");

        return nameErrors.size() != 0 ? nameErrors : null;
    }

    private static List<String> validatePassword(String password) {
        List<String> passwordErrors = new ArrayList<>();

        if (password.length() < 4 || password.length() > 24) {
            passwordErrors.add("Senha deve conter entre 4 e 24 caracteres");
        }
        if (password.indexOf(" ") != -1) passwordErrors.add("Senha não pode conter espaços em branco");
        if (!password.matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*\\W).*$")) {
            passwordErrors.add("Senha precisa conter maiúsculas, minúsculas, números e símbolos");
        }

        return passwordErrors.size() != 0 ? passwordErrors : null;
   }

    private static List<String> validateUserImg(String imgPath) {
        List<String> profileImgErrors = new ArrayList<>();

        if (imgPath.contains(" ")) profileImgErrors.add("Imagem não pode conter espaços em branco");
        if (imgPath.indexOf("/") == -1) profileImgErrors.add("Imagem informada é inválida");

        return profileImgErrors.size() != 0 ? profileImgErrors : null;
    }
}
