package com.mystack.techblog.entities;

import java.io.Serializable;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
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

    @Column(columnDefinition = "INT UNSIGNED default 0")
    private Integer likes; // TODO -> Substituir por um HashSet de usersLikes com outros users, fazer dto com usersLikesIds e fazer lógica dos services/controllers para só poder ter like ou dislike por user

    @Column(columnDefinition = "INT UNSIGNED default 0")
    private Integer dislikes; // TODO -> Substituir por um HashSet de usersDislikes com outros users, fazer dto com usersDislikesIds e fazer lógica dos services/controllers para só poder ter like ou dislike por user

    @ManyToOne
    @JoinColumn(name = "post_id", columnDefinition = "BIGINT UNSIGNED", nullable = false)
    private Post post;

    @ManyToOne
    @JoinColumn(name = "user_id", columnDefinition = "BIGINT UNSIGNED", nullable = false)
    private User user;
}
