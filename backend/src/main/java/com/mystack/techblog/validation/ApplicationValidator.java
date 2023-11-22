package com.mystack.techblog.validation;

import java.util.ArrayList;
import java.util.List;

import com.mystack.techblog.entities.auth.LoginRequest;
import com.mystack.techblog.entities.auth.RegisterRequest;
import com.mystack.techblog.entities.messages.ValidationErrors;

public class ApplicationValidator {
    // TODO -> Fazer validações dos demais DTOS - Comment, Tags e Posts

    public static ValidationErrors validateRegisterRequest(RegisterRequest data) {
        ValidationErrors errors = new ValidationErrors();

        var emailErrors = validateEmail(data.email());
        var firstNameErrors = validateName(data.firstName());
        var lastNameErrors = validateName(data.lastName());
        var passwordErrors = validatePassword(data.password());

        if (emailErrors != null) errors.addErrors("emailErrors", emailErrors);
        if (firstNameErrors != null) errors.addErrors("firstNameErrors", firstNameErrors);
        if (lastNameErrors != null) errors.addErrors("lastNameErrors", lastNameErrors);
        if (passwordErrors != null) errors.addErrors("passwordErrors", passwordErrors);

        return errors.getErrors().size() > 0 ? errors : null;
    }

    public static ValidationErrors validateLoginRequest(LoginRequest data) {
        ValidationErrors errors = new ValidationErrors();

        var emailErrors = validateEmail(data.email());
        var passwordErrors = validatePassword(data.password());

        if (emailErrors != null) errors.addErrors("emailErrors", emailErrors);
        if (passwordErrors != null) errors.addErrors("passwordErrors", passwordErrors);

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
}
