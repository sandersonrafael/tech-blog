package com.mystack.techblog.entities;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(of = "id")
public class Comment implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "BIGINT UNSIGNED")
    private Long id;

    @Column(length = 1000, nullable = false)
    private String content;

    private Date createdAt;
    private Date updatedAt;

    @ManyToMany
    @JoinTable(
        name = "user_comment_like",
        joinColumns = @JoinColumn(name = "comment_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id")
    )
    private Set<User> usersLikes;

    @ManyToMany
    @JoinTable(
        name = "user_comment_dislike",
        joinColumns = @JoinColumn(name = "comment_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id")
    )
    private Set<User> usersDislikes;

    @ManyToOne
    @JoinColumn(name = "post_id", columnDefinition = "BIGINT UNSIGNED", nullable = false)
    private Post post;

    @ManyToOne
    @JoinColumn(name = "user_id", columnDefinition = "BIGINT UNSIGNED", nullable = false)
    private User user;
}
