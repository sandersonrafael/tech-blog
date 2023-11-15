package com.mystack.techblog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mystack.techblog.entities.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {

}
