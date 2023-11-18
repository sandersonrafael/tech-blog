package com.mystack.techblog.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mystack.techblog.entities.Tag;
import com.mystack.techblog.entities.dtos.TagDTO;
import com.mystack.techblog.mapper.Mapper;
import com.mystack.techblog.repositories.TagRepository;

@Service
public class TagService {

    @Autowired
    private TagRepository repository;

    public List<TagDTO> findAll() {
        List<Tag> dbTags = repository.findAll();
        return dbTags.stream().map(tag -> Mapper.tagToDTO(tag)).toList();
    }

    public TagDTO findById(Long id) {
        Tag dbTag = repository.findById(id)
            .orElse(null);
        if (dbTag == null) return null;

        return Mapper.tagToDTO(dbTag);
    }

    public TagDTO create(TagDTO dto) {
        Tag persisted = repository.save(Mapper.dtoToTag(dto));
        return Mapper.tagToDTO(persisted);
    }

    public TagDTO update(Long id, TagDTO dto) {
        Tag dbTag = repository.findById(id)
            .orElse(null);
        if (dbTag == null) return null;

        dbTag.setTag(dto.getTag());
        return Mapper.tagToDTO(repository.save(dbTag));
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
