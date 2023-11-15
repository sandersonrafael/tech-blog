package com.mystack.techblog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mystack.techblog.entities.Post;

public interface PostRepository extends JpaRepository<Post, Long> {

}
