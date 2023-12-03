package com.mystack.techblog.controllers.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mystack.techblog.entities.auth.AuthenticationResponse;
import com.mystack.techblog.entities.auth.ChangePasswordRequest;
import com.mystack.techblog.entities.auth.LoginRequest;
import com.mystack.techblog.entities.auth.RecoverRequest;
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
    public ResponseEntity<?> login(@RequestBody LoginRequest data) {
        ValidationErrors errors = ApplicationValidator.validateLoginRequest(data);
        if (errors != null) return ResponseEntity.badRequest().body(errors);

        String token = service.login(data);
        AuthenticationResponse auth = new AuthenticationResponse(token);

        return ResponseEntity.ok(auth);
    }

    @PostMapping("/first-login/{confirmationToken}")
    public ResponseEntity<?> firstLogin(@RequestBody LoginRequest request, @PathVariable String confirmationToken) {
        ValidationErrors errors = ApplicationValidator.validateLoginRequest(request);
        if (errors != null) return ResponseEntity.badRequest().body(errors);

        String token = service.firstLogin(request, confirmationToken);
        AuthenticationResponse auth = new AuthenticationResponse(token);

        return ResponseEntity.ok(auth);
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(
        @RequestBody ChangePasswordRequest request,
        @RequestHeader("Authorization") String token
    ) {
        ValidationErrors errors = ApplicationValidator.validateChangePassword(request);
        if (errors != null) return ResponseEntity.badRequest().body(errors);

        service.changePassword(request, token);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/recover")
    public ResponseEntity<?> requestRecoverPassword(@RequestBody RecoverRequest request) {
        ValidationErrors errors = ApplicationValidator.validateRecoverPasswordRequest(request);
        if (errors != null) return ResponseEntity.badRequest().body(errors);

        service.requestRecoverPassword(request);

        return ResponseEntity.ok().build();
    }
    // TODO -> mudar isso para um RequestHeader("Authorization") em vez de PathVariable e mudar a route para /recover e o de cima para /recover/request -> mudar no insomnia também e na aplicação frontend
    @PostMapping("/recover/{recoveryToken}")
    public ResponseEntity<?> recoverPassword(@RequestBody LoginRequest request, @PathVariable String recoveryToken) {
        ValidationErrors errors = ApplicationValidator.validateLoginRequest(request);
        if (errors != null) return ResponseEntity.badRequest().body(errors);

        String token = service.recoverPassword(request, recoveryToken);
        AuthenticationResponse auth = new AuthenticationResponse(token);

        return ResponseEntity.ok(auth);
    }
}
