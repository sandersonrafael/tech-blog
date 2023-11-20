package com.mystack.techblog.entities.dtos;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
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
    private Long likes;

    private Set<TagDTO> tags = new HashSet<>();

    private List<CommentDTO> comments = new ArrayList<>();

    public PostDTO(Long id, String title, String thumb, String miniature, String thumbAlt, String postUrl, String description,
            String content, Date createdAt, Date updatedAt, Long views, Long likes) {
        this.id = id;
        this.title = title;
        this.thumb = thumb;
        this.miniature = miniature;
        this.thumbAlt = thumbAlt;
        this.postUrl = postUrl;
        this.description = description;
        this.content = content;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.views = views;
        this.likes = likes;
    }
}
