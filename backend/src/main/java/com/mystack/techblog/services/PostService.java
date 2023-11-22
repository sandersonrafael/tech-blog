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

    public List<PostDTO> findAll() {
        List<Post> dbPosts = repository.findAll();
        return dbPosts.stream().map(post -> Mapper.postToDto(post)).toList();
    }

    public PostDTO findById(Long id) {
        Post dbPost = repository.findById(id).orElse(null);
        if (dbPost == null) return null;

        dbPost.setViews(dbPost.getViews() + 1);
        dbPost = repository.save(dbPost);

        return Mapper.postToDto(dbPost);
    }

    public PostDTO create(PostDTO dto) {
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
            Tag checkTag = tagRepository.findByName(tagDto.getTag());
            tagsReceived.add(checkTag == null ? tagRepository.save(Mapper.dtoToTag(tagDto)) : checkTag);
        });

        Post persisted = repository.save(Mapper.dtoToPost(dto));
        persisted.setTags(tagsReceived);
        repository.save(persisted);

        return Mapper.postToDto(persisted);
    }

    public PostDTO update(Long id, PostDTO dto) {
        Post dbPost = repository.findById(id).orElse(null);

        if (dbPost == null) return null;

        if (dto.getTitle() != null) dbPost.setTitle(dto.getTitle());
        if (dto.getThumb() != null) dbPost.setThumb(dto.getThumb());
        if (dto.getMiniature() != null) dbPost.setMiniature(dto.getMiniature());
        if (dto.getThumbAlt() != null) dbPost.setThumbAlt(dto.getThumbAlt());
        if (dto.getPostUrl() != null) dbPost.setPostUrl(dto.getPostUrl());
        if (dto.getDescription() != null) dbPost.setDescription(dto.getDescription());
        if (dto.getContent() != null) dbPost.setContent(dto.getContent());

        dbPost.setUpdatedAt(new Date());

        dbPost = repository.save(dbPost);
        return Mapper.postToDto(dbPost);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public String likePost(Long id, String token) {
        token = token.replace("Bearer ", "");
        String userEmail = tokenService.validateToken(token);

        User user = userRepository.findUserByEmail(userEmail).orElse(null);
        if (user == null) return null;

        Post post = repository.findById(id).orElse(null);
        if (post == null) return null;

        if (post.getUsersLikes().contains(user)) {
            post.getUsersLikes().remove(user);
            repository.save(post);
            return "Curtida removida com sucesso";
        }

        post.getUsersLikes().add(user);
        repository.save(post);
        return "Curtida adicionada com sucesso";
    }
}
