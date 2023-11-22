package com.mystack.techblog.entities.dtos;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(of = "id")
public class PostDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long id;
    private String title;
    private String thumb;
    private String miniature;
    private String thumbAlt;
    private String postUrl;
    private String description;
    private String content;
    private Date createdAt;
    private Date updatedAt;
    private Long views;

    private List<TagDTO> tags = new ArrayList<>();

    private List<CommentDTO> comments = new ArrayList<>();

    private List<UserDTO> usersLikes = new ArrayList<>();
}
