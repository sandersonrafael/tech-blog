package com.mystack.techblog.services;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mystack.techblog.entities.Post;
import com.mystack.techblog.repositories.PostRepository;

@Service
public class PostService {

    @Autowired
    private PostRepository repository;

    public List<Post> findAll() {
        return repository.findAll();
    }

    public Post findById(Long id) {
        Post post = repository.findById(id)
            .orElseThrow();
        post.setViews(post.getViews() + 1);
        update(post.getId(), post);
        return post;
    }

    public Post create(Post post) {
        Date now = new Date();
        post.setCreatedAt(now);
        post.setUpdatedAt(now);
        post.setViews(0L);
        post.setLikes(0L);
        return repository.save(post);
    }

    public Post update(Long id, Post post) {
        Post entity;
        try {
            entity = repository.findById(id)
            .orElseThrow(() -> new Exception("Resource not found"));
        post.setId(id);
        } catch (Exception e) {
            return null;
        }

        if (post.getTitle() != null) entity.setTitle(post.getTitle());
        if (post.getThumb() != null) entity.setThumb(post.getThumb());
        if (post.getMiniature() != null) entity.setMiniature(post.getMiniature());
        if (post.getThumbAlt() != null) entity.setThumbAlt(post.getThumbAlt());
        if (post.getPostUrl() != null) entity.setPostUrl(post.getPostUrl());
        if (post.getDescription() != null) entity.setDescription(post.getDescription());
        if (post.getContent() != null) entity.setContent(post.getContent());

        entity.setUpdatedAt(new Date());

        return repository.save(entity);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
