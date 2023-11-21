package com.mystack.techblog.entities.auth;

public record RegisterRequest(
    String firstName,
    String lastName,
    String profileImg,
    String email,
    String password
) {}
