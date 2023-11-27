package com.mystack.techblog.entities.auth;

public record ChangePasswordRequest(
    String email,
    String oldPassword,
    String newPassword
) {}
