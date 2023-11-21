package com.mystack.techblog.services.auth;

import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.mystack.techblog.entities.User;

@Service
public class TokenService {

    @Value("${api.security.token.secret}")
    private String secret;

    @Value("${api.security.token.expiresAt}")
    private Long expiresAt;

    @Value("${api.security.token.issuer}")
    private String issuer;

    public String generateToken(User user) {
        Algorithm algorithm = Algorithm.HMAC256(secret);

        return JWT.create()
            .withIssuer(issuer)
            .withSubject(user.getEmail())
            .withExpiresAt(getExpireTime(expiresAt))
            .sign(algorithm);
    }

    public String validateToken(String token) {
        Algorithm algorithm = Algorithm.HMAC256(secret);

        return JWT.require(algorithm)
            .withIssuer(issuer)
            .build()
            .verify(token)
            .getSubject();
    }

    private Date getExpireTime(Long milliseconds) {
        return new Date(new Date().getTime() + milliseconds);
    }
}
