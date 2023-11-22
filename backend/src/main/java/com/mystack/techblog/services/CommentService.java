package com.mystack.techblog.services;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mystack.techblog.entities.Comment;
import com.mystack.techblog.entities.User;
import com.mystack.techblog.entities.dtos.CommentDTO;
import com.mystack.techblog.mapper.Mapper;
import com.mystack.techblog.repositories.CommentRepository;
import com.mystack.techblog.repositories.PostRepository;
import com.mystack.techblog.repositories.UserRepository;
import com.mystack.techblog.services.auth.TokenService;

@Service
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
        User dbUser = validateTokenReceived(token);
        if (dbUser == null) return null;

        var post = postRepository.findById(dto.getPostId()).orElse(null);
        if (post == null) return null;

        Date now = new Date();
        dto.setCreatedAt(now);
        dto.setUpdatedAt(now);

        Comment comment = Mapper.dtoToComment(dto, post, dbUser, null, null);

        Comment persisted = repository.save(comment);

        return Mapper.commentToDto(persisted);
    }

    public CommentDTO update(Long id, CommentDTO dto, String token) {
        Comment dbComment = repository.findById(id).orElse(null);
        if (dbComment == null) return null;

        User dbUser = validateTokenReceived(token);
        if (dbUser == null) return null;

        if (dbComment.getUser().getId() != dbUser.getId()) return null;

        if (dto.getContent() != null && !dto.getContent().isBlank()) {
            dbComment.setContent(dto.getContent());
            dbComment.setUpdatedAt(new Date());
            dbComment = repository.save(dbComment);

            return Mapper.commentToDto(dbComment);
        }

        return null;
    }

    public Void delete(Long id, String token) {
        User dbUser = validateTokenReceived(token);
        if (dbUser == null) return null;

        Comment dbComment = repository.findById(id).orElse(null);
        if (dbComment == null) return null;

        if (dbComment.getUser().getId() == dbUser.getId()) {
            repository.deleteById(id);
            return null;
        }

        return null;
    }

    public String likeComment(Long id, String token) {
        User dbUser = validateTokenReceived(token);
        if (dbUser == null) return null;

        Comment dbComment = repository.findById(id).orElse(null);
        if (dbComment == null) return null;

        if (dbComment.getUsersLikes().contains(dbUser)) {
            dbComment.getUsersLikes().remove(dbUser);

            repository.save(dbComment);
            return "Curtida removida com sucesso do comentário";
        }

        if (dbComment.getUsersDislikes().contains(dbUser)) {
            dbComment.getUsersDislikes().remove(dbUser);
        }

        dbComment.getUsersLikes().add(dbUser);
        repository.save(dbComment);
        return "Curtida adicionada com sucesso ao comentário";
    }

    public String dislikeComment(Long id, String token) {
        User dbUser = validateTokenReceived(token);
        if (dbUser == null) return null;

        Comment dbComment = repository.findById(id).orElse(null);
        if (dbComment == null) return null;

        if (dbComment.getUsersDislikes().contains(dbUser)) {
            dbComment.getUsersDislikes().remove(dbUser);

            repository.save(dbComment);
            return "Descurtida removida com sucesso do comentário";
        }

        if (dbComment.getUsersLikes().contains(dbUser)) {
            dbComment.getUsersLikes().remove(dbUser);
        }

        dbComment.getUsersDislikes().add(dbUser);
        repository.save(dbComment);
        return "Descurtida adicionada com sucesso ao comentário";
    }

    private User validateTokenReceived(String token) {
        token = token.replace("Bearer ", "");
        String email = tokenService.validateToken(token);
        User user = userRepository.findUserByEmail(email).orElse(null);
        if (user == null) return null;
        return user;
    }
}
