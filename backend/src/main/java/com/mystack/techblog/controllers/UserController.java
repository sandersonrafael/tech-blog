package com.mystack.techblog.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mystack.techblog.entities.dtos.UserDTO;
import com.mystack.techblog.entities.dtos.UserDetailsDTO;
import com.mystack.techblog.entities.messages.ValidationErrors;
import com.mystack.techblog.services.UserService;
import com.mystack.techblog.validation.ApplicationValidator;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService service;

    @GetMapping
    public ResponseEntity<List<UserDTO>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/details")
    public ResponseEntity<UserDetailsDTO> findByToken(@RequestHeader("Authorization") String authorization) {
        return ResponseEntity.ok(service.findByToken(authorization));
    }

    @PutMapping
    private ResponseEntity<?> update(@RequestBody UserDTO dto, @RequestHeader("Authorization") String token) {
        ValidationErrors errors = ApplicationValidator.validateUserUpdate(dto);
        if (errors != null) return ResponseEntity.badRequest().body(errors);

        return ResponseEntity.ok(service.update(dto, token));
    }
}
