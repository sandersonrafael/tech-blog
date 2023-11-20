package com.mystack.techblog.entities.auth;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.mystack.techblog.entities.enums.Role;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(of = "id")
public class UserData implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long id;
    private String firstName;
    private String lastName;
    private String profileImg;
    private Date createdAt;
    private Role role;

    private List<Long> commentsIds = new ArrayList<>();

    public UserData(Long id, String firstName, String lastName, String profileImg, Date createdAt, Role role) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.profileImg = profileImg;
        this.createdAt = createdAt;
        this.role = role;
    }
}
