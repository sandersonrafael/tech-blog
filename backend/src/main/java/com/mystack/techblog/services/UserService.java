package com.mystack.techblog.services;

import java.util.Date;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import com.mystack.techblog.entities.User;
import com.mystack.techblog.entities.auth.RegisterRequest;
import com.mystack.techblog.entities.auth.UserData;
import com.mystack.techblog.entities.dtos.UserDTO;
import com.mystack.techblog.entities.enums.Role;
import com.mystack.techblog.mapper.Mapper;
import com.mystack.techblog.repositories.UserRepository;

@Service
public class UserService {

    ModelMapper modelMapper = new ModelMapper();

    @Autowired
    private UserRepository repository;
    public UserData register(RegisterRequest req) {
        User user = modelMapper.map(req, User.class);

        user.setCreatedAt(new Date());
        if (user.getProfileImg() == null || user.getProfileImg() == "") {
            user.setProfileImg("/imgs/profile-img-default.png");
        }
        user.setPasswordHash(BCrypt.hashpw(req.getPassword(), BCrypt.gensalt()));
        user.setRole(Role.USER);

        user = repository.save(user);
        return Mapper.userToUserData(user);
    }

    // fazer
    public UserDTO login() {
        return new UserDTO();
    }

    // public UserDTO accessWithToken() {}

    // public UserDTO findAll() { ... }
}
