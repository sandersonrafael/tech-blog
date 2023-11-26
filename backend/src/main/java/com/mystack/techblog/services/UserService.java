package com.mystack.techblog.services;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mystack.techblog.entities.User;
import com.mystack.techblog.entities.dtos.UserDTO;
import com.mystack.techblog.entities.dtos.UserDetailsDTO;
import com.mystack.techblog.exceptions.ResourceNotFoundException;
import com.mystack.techblog.mapper.Mapper;
import com.mystack.techblog.repositories.UserRepository;
import com.mystack.techblog.services.auth.TokenService;

@Service
public class UserService {

    private final ModelMapper mapper = new ModelMapper();

    @Autowired
    private UserRepository repository;

    @Autowired
    private TokenService tokenService;

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
}
