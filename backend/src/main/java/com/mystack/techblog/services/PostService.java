package com.mystack.techblog.services;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mystack.techblog.entities.Post;
import com.mystack.techblog.entities.Tag;
import com.mystack.techblog.repositories.PostRepository;
import com.mystack.techblog.repositories.TagRepository;

@Service
public class PostService {

    @Autowired
    private PostRepository repository;

    @Autowired
    private TagRepository tagRepository;

    public List<Post> findAll() {
        repository.findAll().stream().forEach(x -> x.getTags().stream().forEach(y -> System.out.println(y.getTag())));
        return repository.findAll();
    }

    public Post findById(Long id) {
        Post post = repository.findById(id)
            .orElseThrow();
        post.setViews(post.getViews() + 1);
        update(post.getId(), post);
        System.out.println(post.getTags());
        return post;
    }

    public Post create(Post post) {
        Date now = new Date();
        post.setCreatedAt(now);
        post.setUpdatedAt(now);
        post.setViews(0l);
        post.setLikes(0L);

        Set<Tag> tagsReceived = new HashSet<>();
        post.getTags().forEach(t -> {
            Tag checkTag = tagRepository.findByName(t.getTag());
            tagsReceived.add(checkTag == null ? t : checkTag);
        });

        post.getTags().removeIf(t -> t != null);

        Post persisted = repository.save(post);
        persisted.setTags(tagsReceived);
        return repository.save(persisted);
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
