package com.mystack.techblog.services.auth;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.mystack.techblog.entities.User;
import com.mystack.techblog.entities.auth.LoginRequest;
import com.mystack.techblog.entities.auth.RegisterRequest;
import com.mystack.techblog.entities.enums.Role;
import com.mystack.techblog.exceptions.BadRequestException;
import com.mystack.techblog.exceptions.UnauthorizedException;
import com.mystack.techblog.repositories.UserRepository;

@Service
public class AuthenticationService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private UserRepository repository;

    public String register(RegisterRequest request) {
        if (repository.findByEmail(request.email()) != null) throw new BadRequestException("E-mail indisponível para cadastro");

        String passwordHash = passwordEncoder.encode(request.password().trim());
        String profileImg = request.profileImg().isBlank() || request.profileImg() == null
            ? "/imgs/default-profile-img.png"
            : request.profileImg().trim();

        User user = new User(
            null,
            request.firstName(),
            request.lastName(),
            profileImg,
            request.email().toLowerCase(),
            passwordHash,
            new Date(),
            Role.USER,
            null,
            null,
            null,
            null
        );

        user = repository.save(user);

        return tokenService.generateToken(user);
    }

    public String login(LoginRequest request) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(request.email().toLowerCase(), request.password());

        Authentication auth;
        try {
            auth = authenticationManager.authenticate(usernamePassword);
        } catch (RuntimeException e) {
            throw new UnauthorizedException("Credenciais inválidas");
        }

        var token = tokenService.generateToken((User) auth.getPrincipal());

        return token;
    }
}
