package com.mystack.techblog.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Value("${api.security.cors.originPatterns}")
    private String corsPatterns;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        String[] allowedOrigins = corsPatterns.split(",");
        registry.addMapping("/**")
            .allowedMethods("*")
            .allowedOrigins(allowedOrigins)
            .allowCredentials(true);
    }
}
