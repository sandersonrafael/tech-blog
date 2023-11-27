package com.mystack.techblog.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mystack.techblog.entities.NewsletterSubscriber;
import com.mystack.techblog.entities.dtos.NewsletterSubscriberDTO;
import com.mystack.techblog.exceptions.BadRequestException;
import com.mystack.techblog.exceptions.ResourceNotFoundException;
import com.mystack.techblog.repositories.NewsletterSubscriberRepository;

@Service
public class NewsletterService {

    @Autowired
    private NewsletterSubscriberRepository repository;

    public void subscribe(NewsletterSubscriberDTO dto) {
        NewsletterSubscriber dbSubscriber = repository.findByEmail(dto.getEmail()).orElse(null);
        if (dbSubscriber != null) {
            throw new BadRequestException("Usuário já inscrito na newsletter");
        }

        repository.save(new NewsletterSubscriber(null, dto.getEmail()));
    }

    public void unsubscribe(NewsletterSubscriberDTO dto) {
        NewsletterSubscriber dbSubscriber = repository.findByEmail(dto.getEmail()).orElse(null);
        if (dbSubscriber == null) {
            throw new ResourceNotFoundException("Usuário não encontrado na newsletter");
        }

        repository.delete(dbSubscriber);
    }
}
