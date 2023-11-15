package com.mystack.techblog.entities;

import java.io.Serializable;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Post implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "BIGINT UNSIGNED")
    private Long id;

    @Column(length = 255, nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String thumb;

    @Column(columnDefinition = "TEXT")
    private String miniature;

    private String thumbAlt;

    @Column(nullable = false, unique = true)
    private String postUrl;

    @Column(nullable = false)
    private String description;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    private Date createdAt;
    private Date updatedAt;

    @Column(columnDefinition = "BIGINT UNSIGNED")
    private Long views;

    @Column(columnDefinition = "BIGINT UNSIGNED")
    private Long likes;

    public Post() {
    }

    public Post(Long id, String title, String thumb, String miniature, String thumbAlt, String postUrl,
            String description, String content, Date createdAt, Date updatedAt, Long views, Long likes) {
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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getThumb() {
        return thumb;
    }

    public void setThumb(String thumb) {
        this.thumb = thumb;
    }

    public String getMiniature() {
        return miniature;
    }

    public void setMiniature(String miniature) {
        this.miniature = miniature;
    }

    public String getThumbAlt() {
        return thumbAlt;
    }

    public void setThumbAlt(String thumbAlt) {
        this.thumbAlt = thumbAlt;
    }

    public String getPostUrl() {
        return postUrl;
    }

    public void setPostUrl(String postUrl) {
        this.postUrl = postUrl;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Long getViews() {
        return views;
    }

    public void setViews(Long views) {
        this.views = views;
    }

    public Long getLikes() {
        return likes;
    }

    public void setLikes(Long likes) {
        this.likes = likes;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        result = prime * result + ((title == null) ? 0 : title.hashCode());
        result = prime * result + ((thumb == null) ? 0 : thumb.hashCode());
        result = prime * result + ((miniature == null) ? 0 : miniature.hashCode());
        result = prime * result + ((thumbAlt == null) ? 0 : thumbAlt.hashCode());
        result = prime * result + ((postUrl == null) ? 0 : postUrl.hashCode());
        result = prime * result + ((description == null) ? 0 : description.hashCode());
        result = prime * result + ((content == null) ? 0 : content.hashCode());
        result = prime * result + ((createdAt == null) ? 0 : createdAt.hashCode());
        result = prime * result + ((updatedAt == null) ? 0 : updatedAt.hashCode());
        result = prime * result + ((views == null) ? 0 : views.hashCode());
        result = prime * result + ((likes == null) ? 0 : likes.hashCode());
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
        Post other = (Post) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        if (title == null) {
            if (other.title != null)
                return false;
        } else if (!title.equals(other.title))
            return false;
        if (thumb == null) {
            if (other.thumb != null)
                return false;
        } else if (!thumb.equals(other.thumb))
            return false;
        if (miniature == null) {
            if (other.miniature != null)
                return false;
        } else if (!miniature.equals(other.miniature))
            return false;
        if (thumbAlt == null) {
            if (other.thumbAlt != null)
                return false;
        } else if (!thumbAlt.equals(other.thumbAlt))
            return false;
        if (postUrl == null) {
            if (other.postUrl != null)
                return false;
        } else if (!postUrl.equals(other.postUrl))
            return false;
        if (description == null) {
            if (other.description != null)
                return false;
        } else if (!description.equals(other.description))
            return false;
        if (content == null) {
            if (other.content != null)
                return false;
        } else if (!content.equals(other.content))
            return false;
        if (createdAt == null) {
            if (other.createdAt != null)
                return false;
        } else if (!createdAt.equals(other.createdAt))
            return false;
        if (updatedAt == null) {
            if (other.updatedAt != null)
                return false;
        } else if (!updatedAt.equals(other.updatedAt))
            return false;
        if (views == null) {
            if (other.views != null)
                return false;
        } else if (!views.equals(other.views))
            return false;
        if (likes == null) {
            if (other.likes != null)
                return false;
        } else if (!likes.equals(other.likes))
            return false;
        return true;
    }
}
