package com.mystack.techblog.entities.dtos;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

public class TagDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long id;
    private String tag;
    private Set<Long> postsIds = new HashSet<>();

    public TagDTO() {
    }

    public TagDTO(Long id, String tag) {
        this.id = id;
        this.tag = tag;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public Set<Long> getPostsIds() {
        return postsIds;
    }

    public void setPostsIds(Set<Long> postsIds) {
        this.postsIds = postsIds;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        result = prime * result + ((tag == null) ? 0 : tag.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        TagDTO other = (TagDTO) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        if (tag == null) {
            if (other.tag != null)
                return false;
        } else if (!tag.equals(other.tag))
            return false;
        return true;
    }
}
