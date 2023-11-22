package com.mystack.techblog.services;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mystack.techblog.entities.Comment;
import com.mystack.techblog.entities.Post;
import com.mystack.techblog.entities.User;
import com.mystack.techblog.entities.dtos.CommentDTO;
import com.mystack.techblog.mapper.Mapper;
import com.mystack.techblog.repositories.CommentRepository;
import com.mystack.techblog.repositories.PostRepository;
import com.mystack.techblog.repositories.UserRepository;
import com.mystack.techblog.services.auth.TokenService;

@Service // TODO -> refactorar tudo envolvendo os Mappers para os Mappers personalizados e ModelMapper
public class CommentService {

    @Autowired
    private CommentRepository repository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TokenService tokenService;

    public List<CommentDTO> findAll() {
        List<Comment> dbComments = repository.findAll();
        List<CommentDTO> dtoComments = dbComments.stream().map(comment -> Mapper.commentToDto(comment)).toList();

        return dtoComments;
    }

    public CommentDTO findById(Long id) {
        Comment comment = repository.findById(id)
            .orElse(null);
        if (comment == null) return null;

        CommentDTO dto = Mapper.commentToDto(comment);
        return dto;
    }

    public CommentDTO create(CommentDTO dto, String token) {
        token = token.replace("Bearer ", "");
        String email = tokenService.validateToken(token);
        User user = userRepository.findUserByEmail(email).orElse(null);
        if (user == null) return null;

        var post = postRepository.findById(dto.getPostId()).orElse(null);
        if (post == null) return null;

        Date now = new Date();
        dto.setCreatedAt(now);
        dto.setUpdatedAt(now);
        dto.setLikes(0);
        dto.setDislikes(0);

        Comment comment = Mapper.dtoToComment(dto, post, user);

        Comment persisted = repository.save(comment);

        return Mapper.commentToDto(persisted);
    }

    public CommentDTO update(Long id, CommentDTO dto, String token) {
        Comment dbComment = repository.findById(id).orElse(null);
        if (dbComment == null) return null;

        token = token.replace("Bearer ", "");
        String email = tokenService.validateToken(token);
        User user = userRepository.findUserByEmail(email).orElse(null);

        if (dbComment.getUser().getId() != user.getId()) return null;

        if (dto.getContent() != null && !dto.getContent().isBlank()) {
            dbComment.setContent(dto.getContent());
            dbComment.setUpdatedAt(new Date());
            dbComment = repository.save(dbComment);

            return Mapper.commentToDto(dbComment);
        }

        return null;
    }

    public Void delete(Long id, String token) {
        token = token.replace("Bearer ", "");
        String email = tokenService.validateToken(token);
        User user = userRepository.findUserByEmail(email).orElse(null);
        if (user == null) return null;

        Comment dbComment = repository.findById(id).orElse(null);
        if (dbComment == null) return null;

        if (dbComment.getUser().getId() == user.getId()) {
            repository.deleteById(id);
            return null;
        }

        return null;
    }
}
