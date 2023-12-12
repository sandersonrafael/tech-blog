package com.mystack.techblog.services;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mystack.techblog.entities.Comment;
import com.mystack.techblog.entities.User;
import com.mystack.techblog.entities.dtos.CommentDTO;
import com.mystack.techblog.entities.enums.Role;
import com.mystack.techblog.exceptions.BadRequestException;
import com.mystack.techblog.exceptions.ResourceNotFoundException;
import com.mystack.techblog.exceptions.UnauthorizedException;
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
        Comment comment = repository.findById(id).orElseThrow(
            () -> new ResourceNotFoundException("Comentário não encontrado")
        );

        CommentDTO dto = Mapper.commentToDto(comment);
        return dto;
    }

    public CommentDTO create(CommentDTO dto, String token) {
        User dbUser = validateTokenReceived(token);

        var post = postRepository.findById(dto.getPostId()).orElse(null);
        if (post == null) throw new ResourceNotFoundException("Post não encontrado");
        if (dto.getContent().isBlank() || dto.getContent() == null) {
            throw new BadRequestException("Não é permitido adicionar comentários em branco");
        }

        Date now = new Date();
        dto.setCreatedAt(now);
        dto.setUpdatedAt(now);
        dto.setContent(dto.getContent().trim());

        Comment comment = Mapper.dtoToComment(dto, post, dbUser, null, null);

        Comment persisted = repository.save(comment);

        return Mapper.commentToDto(persisted);
    }

    public CommentDTO update(Long id, CommentDTO dto, String token) {
        Comment dbComment = repository.findById(id).orElseThrow(
            () -> new ResourceNotFoundException("Comentário não encontrado")
        );

        User dbUser = validateTokenReceived(token);

        if (dbUser.getRole() != Role.ADMIN && dbComment.getUser().getId() != dbUser.getId()) {
            throw new BadRequestException("Comentário não pertence ao usuário");
        }

        if (dbComment.getContent() == dto.getContent().trim()) {
            throw new BadRequestException("Novo texto do comentário é igual ao anterior");
        }

        if (dto.getContent().isBlank() || dto.getContent() == null) {
            throw new BadRequestException("Não é permitido adicionar comentários em branco");
        }

        if (dto.getContent() != null && !dto.getContent().isBlank() || dbUser.getRole() == Role.ADMIN) {
            dbComment.setContent(dto.getContent().trim());
            dbComment.setUpdatedAt(new Date());
            dbComment = repository.save(dbComment);

            return Mapper.commentToDto(dbComment);
        }

        throw new BadRequestException("Campo content não pode estar vazio");
    }

    public void delete(Long id, String token) {
        User dbUser = validateTokenReceived(token);

        Comment dbComment = repository.findById(id).orElseThrow(
            () -> new ResourceNotFoundException("Comentário não encontrado")
        );

        if (dbComment.getUser().getId() == dbUser.getId() || dbUser.getRole() == Role.ADMIN) {
            repository.deleteById(id);
            return;
        }
        throw new UnauthorizedException("Comentário não pertence ao usuário");
    }

    public void likeComment(Long id, String token) {
        User dbUser = validateTokenReceived(token);

        Comment dbComment = repository.findById(id).orElseThrow(
            () -> new ResourceNotFoundException("Comentário não encontrado")
        );

        if (dbComment.getUsersLikes().contains(dbUser)) {
            dbComment.getUsersLikes().remove(dbUser);

            repository.save(dbComment);
            return;
        }

        if (dbComment.getUsersDislikes().contains(dbUser)) {
            dbComment.getUsersDislikes().remove(dbUser);
        }

        dbComment.getUsersLikes().add(dbUser);
        repository.save(dbComment);
    }

    public void dislikeComment(Long id, String token) {
        User dbUser = validateTokenReceived(token);

        Comment dbComment = repository.findById(id).orElseThrow(
            () -> new ResourceNotFoundException("Comentário não encontrado")
        );

        if (dbComment.getUsersDislikes().contains(dbUser)) {
            dbComment.getUsersDislikes().remove(dbUser);

            repository.save(dbComment);
            return;
        }

        if (dbComment.getUsersLikes().contains(dbUser)) {
            dbComment.getUsersLikes().remove(dbUser);
        }

        dbComment.getUsersDislikes().add(dbUser);
        repository.save(dbComment);
    }

    private User validateTokenReceived(String token) {
        token = token.replace("Bearer ", "");
        String email = tokenService.validateToken(token);
        User user = userRepository.findUserByEmail(email).orElseThrow(
            () -> new ResourceNotFoundException("Usuário não encontrado")
        );
        return user;
    }
}
