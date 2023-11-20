package com.mystack.techblog.entities.dtos;

import java.io.Serializable;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(of = "id") // TODO -> fazer a lógica para receber o userId e relacionar no DB
public class CommentDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long id;
    private String content;
    private Date createdAt;
    private Date updatedAt;
    private Integer likes;
    private Integer dislikes;
    private Long postId;
    private Long userId;
}
