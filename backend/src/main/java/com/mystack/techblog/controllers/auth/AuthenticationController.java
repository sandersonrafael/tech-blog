package com.mystack.techblog.controllers.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mystack.techblog.entities.auth.AuthenticationResponse;
import com.mystack.techblog.entities.auth.LoginRequest;
import com.mystack.techblog.entities.auth.RegisterRequest;
import com.mystack.techblog.entities.messages.ValidationErrors;
import com.mystack.techblog.services.auth.AuthenticationService;
import com.mystack.techblog.validation.ApplicationValidator;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest data) {
        ValidationErrors errors = ApplicationValidator.validateRegisterRequest(data);
        if (errors != null) return ResponseEntity.badRequest().body(errors);

        service.register(data);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/login")
    public ResponseEntity<?> postMethodName(@RequestBody LoginRequest data) {
        ValidationErrors errors = ApplicationValidator.validateLoginRequest(data);
        if (errors != null) return ResponseEntity.badRequest().body(errors);

        String token = service.login(data);
        AuthenticationResponse auth = new AuthenticationResponse(token);

        return ResponseEntity.ok(auth);
    }

    // TODO -> Criar path e method POST para "firstLogin", onde o usuário faz o mesmo que login, mas faz o enabled = true na conta
    // Verificando o token de acordo com o método validateAccountConfirmationToken do TokenService
}
