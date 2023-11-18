package com.mystack.techblog.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mystack.techblog.entities.auth.RegisterRequest;
import com.mystack.techblog.entities.auth.UserData;
import com.mystack.techblog.entities.dtos.UserDTO;
import com.mystack.techblog.services.UserService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:3000"})
public class UserController {

    @Autowired
    private UserService service;

    @GetMapping("/users")
    public ResponseEntity<List<UserDTO>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @PostMapping("/auth/register")
    public ResponseEntity<UserData> register(@RequestBody RegisterRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.register(req));
    }

    // @PostMapping("/auth/login")
    // public ResponseEntity<UserData> login(@RequestBody LoginRequest req) {
    //     return ResponseEntity.ok(service.login(req));
    // }
}
