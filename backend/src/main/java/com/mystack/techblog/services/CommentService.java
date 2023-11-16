package com.mystack.techblog.services;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mystack.techblog.entities.Comment;
import com.mystack.techblog.repositories.CommentRepository;

@Service
public class CommentService {

    @Autowired
    private CommentRepository repository;

    public List<Comment> findAll() {
        return repository.findAll();
    }

    public Comment findById(Long id) {
        return repository.findById(id)
            .orElseThrow();
    }

    public Comment create(Comment comment) {
        comment.setLikes(0);
        comment.setDislikes(0);
        comment.setCreatedAt(new Date());
        comment.setUpdatedAt(new Date());

        return repository.save(comment);
    }

    public Comment update(Long id, Comment comment) {
        Comment entity = repository.findById(id)
            .orElseThrow();

        if (comment.getContent() != null) entity.setContent(comment.getContent());
        entity.setUpdatedAt(new Date());

        return repository.save(entity);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
