package com.mystack.techblog.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private SecurityTokenFilter securityTokenFilter;

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(
                    HttpMethod.GET, "/api/posts/**", "/api/tags/**", "/api/comments/**", "/api/users"
                ).permitAll()
                .requestMatchers(HttpMethod.POST, "/api/posts/**", "/api/tags/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/posts/**", "/api/tags/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/posts/**", "/api/tags/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PATCH, "/api/posts/**").hasRole("USER")
                .requestMatchers(HttpMethod.GET, "/api/users/**", "/api/comments/**").hasRole("USER")
                .requestMatchers(HttpMethod.PUT, "/api/users/**", "/api/comments/**").hasRole("USER")
                .requestMatchers(HttpMethod.DELETE, "/api/users/**", "/api/comments/**").hasRole("USER")
                .requestMatchers(HttpMethod.POST, "/api/comments/**").hasRole("USER")
                .requestMatchers(HttpMethod.POST, "/auth/**").permitAll()
                .anyRequest().denyAll()
            ).addFilterBefore(securityTokenFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
