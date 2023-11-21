package com.mystack.techblog.entities.auth;

public record LoginRequest(
    String email,
    String password
) {}
