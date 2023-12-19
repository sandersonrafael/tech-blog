package com.mystack.techblog.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mystack.techblog.entities.email.ContactRequest;
import com.mystack.techblog.entities.messages.ValidationErrors;
import com.mystack.techblog.services.MailService;
import com.mystack.techblog.validation.ApplicationValidator;

@RestController
@RequestMapping("/api/mail")
public class MailController {

    @Autowired
    private MailService service;

    @PostMapping("/request-contact")
    public ResponseEntity<?> requestEmailContact(@RequestBody ContactRequest data) {
        ValidationErrors errors = ApplicationValidator.validateEmailRequest(data);
        if (errors != null) return ResponseEntity.badRequest().body(errors);

        service.requestEmailContact(data);
        return ResponseEntity.ok().build();
    }
}
