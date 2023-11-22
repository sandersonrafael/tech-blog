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
public class CommentDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long id;
    private String content;
    private Date createdAt;
    private Date updatedAt;
    private List<Long> usersLikesIds = new ArrayList<>();
    private List<Long> usersDislikesIds = new ArrayList<>();
    private Long postId;
    private UserDTO author;
}
