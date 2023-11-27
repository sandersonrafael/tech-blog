package com.mystack.techblog.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mystack.techblog.entities.NewsletterSubscriber;

public interface NewsletterSubscriberRepository extends JpaRepository<NewsletterSubscriber, Long> {

    public Optional<NewsletterSubscriber> findByEmail(String email);
}
