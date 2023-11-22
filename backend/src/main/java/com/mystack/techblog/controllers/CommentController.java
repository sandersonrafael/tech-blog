package com.mystack.techblog.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mystack.techblog.entities.dtos.CommentDTO;
import com.mystack.techblog.services.CommentService;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin(origins = {"http://localhost:3000"})
public class CommentController {

    @Autowired
    private CommentService service;

    @GetMapping
    public ResponseEntity<List<CommentDTO>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CommentDTO> findById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping
    public ResponseEntity<CommentDTO> create(@RequestBody CommentDTO dto, @RequestHeader("Authorization") String token) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(dto, token));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CommentDTO> update(
        @PathVariable Long id,
        @RequestBody CommentDTO dto,
        @RequestHeader("Authorization") String token
    ) {
        return ResponseEntity.ok(service.update(id, dto, token));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id, @RequestHeader("Authorization") String token) {
        service.delete(id, token);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/like/{id}")
    public ResponseEntity<?> likeComment(@PathVariable Long id, @RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(service.likeComment(id, token));
    }

    @PatchMapping("/dislike/{id}")
    public ResponseEntity<?> dislikeComment(@PathVariable Long id, @RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(service.dislikeComment(id, token));
    }
}
