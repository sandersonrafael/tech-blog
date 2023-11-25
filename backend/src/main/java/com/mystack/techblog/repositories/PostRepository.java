package com.mystack.techblog.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mystack.techblog.entities.Post;

public interface PostRepository extends JpaRepository<Post, Long> {

    Optional<Post> findByPostUrl(String postUrl);
}
