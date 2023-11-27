package com.mystack.techblog.services;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.mystack.techblog.entities.Comment;
import com.mystack.techblog.entities.Post;
import com.mystack.techblog.entities.User;
import com.mystack.techblog.entities.auth.LoginRequest;
import com.mystack.techblog.entities.dtos.UserDTO;
import com.mystack.techblog.entities.dtos.UserDetailsDTO;
import com.mystack.techblog.exceptions.ResourceNotFoundException;
import com.mystack.techblog.exceptions.UnauthorizedException;
import com.mystack.techblog.mapper.Mapper;
import com.mystack.techblog.repositories.CommentRepository;
import com.mystack.techblog.repositories.PostRepository;
import com.mystack.techblog.repositories.UserRepository;
import com.mystack.techblog.services.auth.TokenService;

@Service
public class UserService {

    private final ModelMapper mapper = new ModelMapper();

    @Autowired
    private UserRepository repository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private PasswordEncoder encoder;

    public List<UserDTO> findAll() {
        var users = repository.findAll();
        return users.stream().map(Mapper::userToDto).toList();
    }

    public UserDetailsDTO findByToken(String token) {
        token = token.replace("Bearer ", "");
        String userEmail = tokenService.validateToken(token);

        User user = repository.findUserByEmail(userEmail).orElseThrow(
            () -> new ResourceNotFoundException("Usuário não encontado")
        );

        UserDetailsDTO dto = mapper.map(user, UserDetailsDTO.class);
        dto.setCommentsIds(user.getComments().stream().map(c -> c.getId()).toList());
        dto.setPostsLikesIds(user.getPostsLikes().stream().map(p -> p.getId()).toList());
        dto.setCommentsLikesIds(user.getCommentsLikes().stream().map(c -> c.getId()).toList());
        dto.setCommentsDislikesIds(user.getCommentsDislikes().stream().map(c -> c.getId()).toList());

        return dto;
    }

    public UserDTO update(UserDTO dto, String token) {
        token = token.replace("Bearer ", "");
        String userEmail;

        try {
            userEmail = tokenService.validateToken(token);
        } catch (Exception e) {
            throw new UnauthorizedException("Token inválido ou expirado");
        }

        User dbUser = repository.findUserByEmail(userEmail).orElse(null);
        if (dbUser == null) throw new ResourceNotFoundException("Usuário não encontrado");

        if (dto.getFirstName() != null && !dto.getFirstName().isBlank()) dbUser.setFirstName(dto.getFirstName());
        if (dto.getLastName() != null && !dto.getLastName().isBlank()) dbUser.setLastName(dto.getLastName());
        if (dto.getProfileImg() != null && !dto.getProfileImg().isBlank()) dbUser.setProfileImg(dto.getProfileImg());

        return Mapper.userToDto(repository.save(dbUser));
    }

    public void delete(LoginRequest request, String token) {
        token = token.replace("Bearer ", "");
        String userEmail;

        try {
            userEmail = tokenService.validateToken(token);
        } catch (Exception e) {
            throw new UnauthorizedException("Token inválido ou expirado");
        }

        User dbUser = repository.findUserByEmail(userEmail).orElse(null);
        if (dbUser == null) throw new ResourceNotFoundException("Usuário não encontrado");
        if (
            !dbUser.getEmail().equals(request.email().toLowerCase())
            || !encoder.matches(request.password(), dbUser.getPasswordHash())
        ) {
            throw new UnauthorizedException("Credenciais inválidas");
        }

        List<Comment> allComments = commentRepository.findAll();
        List<Post> allPosts = postRepository.findAll();

        allComments.forEach(comment -> comment.getUsersLikes().removeIf(user -> user.getId() == dbUser.getId()));
        allComments.forEach(comment -> comment.getUsersDislikes().removeIf(user -> user.getId() == dbUser.getId()));
        allComments.removeIf(comment -> comment.getUser().getId() == dbUser.getId());
        allPosts.forEach(post -> post.getUsersLikes().removeIf(user -> user.getId() == dbUser.getId()));
        allPosts.forEach(post -> post.getComments().removeIf(comment -> comment.getUser().getId() == dbUser.getId()));

        postRepository.saveAll(allPosts);
        commentRepository.saveAll(allComments);

        repository.delete(dbUser);
    }
}
