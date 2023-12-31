package com.mystack.techblog.services;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mystack.techblog.entities.Post;
import com.mystack.techblog.entities.Tag;
import com.mystack.techblog.entities.User;
import com.mystack.techblog.entities.dtos.PostDTO;
import com.mystack.techblog.exceptions.BadRequestException;
import com.mystack.techblog.exceptions.ResourceNotFoundException;
import com.mystack.techblog.mapper.Mapper;
import com.mystack.techblog.repositories.PostRepository;
import com.mystack.techblog.repositories.TagRepository;
import com.mystack.techblog.repositories.UserRepository;
import com.mystack.techblog.services.auth.TokenService;

@Service
public class PostService {

    @Autowired
    private PostRepository repository;

    @Autowired
    private TagRepository tagRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private MailService mailService;

    public List<PostDTO> findAll() {
        List<Post> dbPosts = repository.findAll();
        return dbPosts.stream().map(post -> Mapper.postToDto(post)).toList();
    }

    public PostDTO findById(Long id) {
        Post dbPost = repository.findById(id).orElseThrow(
            () -> new ResourceNotFoundException("Post não encontrado")
        );

        dbPost.setViews(dbPost.getViews() + 1);
        dbPost = repository.save(dbPost);

        return Mapper.postToDto(dbPost);
    }

    public PostDTO create(PostDTO dto) {
        if (repository.findByPostUrl(dto.getPostUrl()).orElse(null) != null) {
            throw new BadRequestException("Url informada para o post já está em uso");
        }

        Date now = new Date();
        dto.setCreatedAt(now);
        dto.setUpdatedAt(now);
        dto.setViews(0L);

        if (dto.getTags().size() == 0) {
            Post persisted = repository.save(Mapper.dtoToPost(dto));
            return Mapper.postToDto(persisted);
        }

        Set<Tag> tagsReceived = new HashSet<>();
        dto.getTags().forEach(tagDto -> {
            Tag checkTag = tagRepository.findByName(tagDto.getTag()).orElse(null);
            tagsReceived.add(checkTag == null ? tagRepository.save(Mapper.dtoToTag(tagDto)) : checkTag);
        });

        Post persisted = repository.save(Mapper.dtoToPost(dto));
        persisted.setTags(tagsReceived);
        repository.save(persisted);

        mailService.sendNewsletterEmail(persisted.getPostUrl(), persisted.getTitle());

        return Mapper.postToDto(persisted);
    }

    public PostDTO update(Long id, PostDTO dto) {
        Post dbPost = repository.findById(id).orElseThrow(
            () -> new ResourceNotFoundException("Post não encontrado")
        );

        if (dto.getTitle() != null) dbPost.setTitle(dto.getTitle());
        if (dto.getThumb() != null) dbPost.setThumb(dto.getThumb());
        if (dto.getMiniature() != null) dbPost.setMiniature(dto.getMiniature());
        if (dto.getThumbAlt() != null) dbPost.setThumbAlt(dto.getThumbAlt());
        if (dto.getPostUrl() != null) dbPost.setPostUrl(dto.getPostUrl());
        if (dto.getDescription() != null) dbPost.setDescription(dto.getDescription());
        if (dto.getContent() != null) dbPost.setContent(dto.getContent());
        if (dto.getTags() != null) {
            Set<Tag> tagsReceived = new HashSet<>();
            dto.getTags().forEach(tagDto -> {
                Tag checkTag = tagRepository.findByName(tagDto.getTag()).orElse(null);
                tagsReceived.add(checkTag == null ? tagRepository.save(Mapper.dtoToTag(tagDto)) : checkTag);
            });

            dbPost.setTags(tagsReceived);
        }

        dbPost.setUpdatedAt(new Date());

        if (dto.getPostUrl() != null && !dto.getPostUrl().isBlank()) {
            if (repository.findByPostUrl(dto.getPostUrl()) != null) {
               throw new BadRequestException("Url informada para o post já está em uso");
            }
        }

        dbPost = repository.save(dbPost);
        return Mapper.postToDto(dbPost);
    }

    public void delete(Long id) {
        repository.findById(id).orElseThrow(
            () -> new ResourceNotFoundException("Post não encontrado")
        );

        repository.deleteById(id);
    }

    public void likePost(Long id, String token) {
        token = token.replace("Bearer ", "");
        String userEmail = tokenService.validateToken(token);

        User user = userRepository.findUserByEmail(userEmail).orElseThrow(
            () -> new ResourceNotFoundException("Usuário fornecido não encontrado")
        );

        Post post = repository.findById(id).orElseThrow(
            () -> new ResourceNotFoundException("Post fornecido não encontrado")
        );

        if (post.getUsersLikes().contains(user)) {
            post.getUsersLikes().remove(user);
            repository.save(post);
            return;
        }

        post.getUsersLikes().add(user);
        repository.save(post);
    }
}
