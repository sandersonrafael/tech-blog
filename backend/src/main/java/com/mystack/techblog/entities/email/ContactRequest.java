package com.mystack.techblog.entities.email;

public record ContactRequest(
    String email,
    String phone,
    String name,
    String message
) {}
