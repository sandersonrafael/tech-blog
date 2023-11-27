package com.mystack.techblog.entities.dtos;

import java.io.Serializable;

import lombok.Data;

@Data
public class NewsletterSubscriberDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long id;
    private String email;
}
