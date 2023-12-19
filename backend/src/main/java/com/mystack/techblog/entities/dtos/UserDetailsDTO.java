package com.mystack.techblog.entities.dtos;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.mystack.techblog.entities.enums.Role;

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
public class UserDetailsDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long id;
    private String firstName;
    private String lastName;
    private String profileImg;
    private String email;
    private Date createdAt;
    private Role role;

    private List<Long> commentsIds = new ArrayList<>();

    private List<Long> postsLikesIds = new ArrayList<>();

    private List<Long> commentsLikesIds = new ArrayList<>();

    private List<Long> commentsDislikesIds = new ArrayList<>();
}
