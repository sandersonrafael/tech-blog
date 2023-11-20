package com.mystack.techblog.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(HttpMethod.GET, "/api/users", "/api/posts/**", "/api/tags/**", "/api/comments/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/posts/**", "/api/tags/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/posts/**", "/api/tags/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/posts/**", "/api/tags/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.POST, "/api/comments/**").hasRole("USER")
                .requestMatchers(HttpMethod.PUT, "/api/comments/**").hasRole("USER")
                .requestMatchers(HttpMethod.DELETE, "/api/comments/**").hasRole("USER")
                .requestMatchers(HttpMethod.GET, "/api/users/**").hasRole("USER")
                .requestMatchers(HttpMethod.PUT, "/api/users/**").hasRole("USER")
                .requestMatchers(HttpMethod.DELETE, "/api/users/**").hasRole("USER")
                .requestMatchers(HttpMethod.POST, "/auth/**").permitAll()
                .anyRequest().denyAll()
            ).build();
    }
}
