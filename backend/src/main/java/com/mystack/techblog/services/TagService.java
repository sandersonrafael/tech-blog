package com.mystack.techblog.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mystack.techblog.entities.Tag;
import com.mystack.techblog.repositories.TagRepository;

@Service
public class TagService {

    @Autowired
    private TagRepository repository;

    public List<Tag> findAll() {
        return repository.findAll();
    }

    public Tag findById(Long id) {
        Tag tag = repository.findById(id)
            .orElseThrow();

        return tag;
    }

    public Tag create(Tag tag) {
        return repository.save(tag);
    }

    public Tag update(Long id, Tag tag) {
        Tag entity = repository.findById(id)
            .orElseThrow();
        entity.setTag(tag.getTag());
        return repository.save(entity);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
