package com.mystack.techblog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mystack.techblog.entities.Tag;

public interface TagRepository extends JpaRepository<Tag, Long> {

}
