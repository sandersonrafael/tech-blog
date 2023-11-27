package com.mystack.techblog.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mystack.techblog.entities.dtos.NewsletterSubscriberDTO;
import com.mystack.techblog.services.NewsletterService;

@RestController
@RequestMapping("/api/newsletter")
public class NewsletterController {

    @Autowired
    private NewsletterService service;

    @PostMapping
    public ResponseEntity<?> subscribe(@RequestBody NewsletterSubscriberDTO dto) {
        service.subscribe(dto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping
    public ResponseEntity<?> unsubscribe(@RequestBody NewsletterSubscriberDTO dto) {
        service.unsubscribe(dto);
        return ResponseEntity.ok().build();
    }
}
