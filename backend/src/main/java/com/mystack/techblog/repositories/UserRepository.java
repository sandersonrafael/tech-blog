package com.mystack.techblog.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.security.core.userdetails.UserDetails;

import com.mystack.techblog.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {

    @Query("SELECT u FROM User u WHERE u.enabled = true")
    List<User> findAll();

    UserDetails findByEmail(String email);

    @Query("SELECT u FROM User u WHERE u.email = :email AND u.enabled = true")
    Optional<User> findUserByEmail(String email);

    @Query("SELECT u FROM User u WHERE u.email = :email")
    Optional<User> findEmailToConfirm(String email);
}
