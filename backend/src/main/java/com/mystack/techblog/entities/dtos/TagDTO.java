package com.mystack.techblog.entities.dtos;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(of = "id")
public class TagDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long id;
    private String tag;
    private List<Long> postsIds = new ArrayList<>();

    public TagDTO(Long id, String tag) {
        this.id = id;
        this.tag = tag;
    }
}
