package com.mystack.techblog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import com.mystack.techblog.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {

    UserDetails findByEmail(String email);
}
