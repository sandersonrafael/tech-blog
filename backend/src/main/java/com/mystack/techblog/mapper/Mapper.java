package com.mystack.techblog.mapper;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.mystack.techblog.entities.Comment;
import com.mystack.techblog.entities.Post;
import com.mystack.techblog.entities.Tag;
import com.mystack.techblog.entities.dtos.CommentDTO;
import com.mystack.techblog.entities.dtos.PostDTO;
import com.mystack.techblog.entities.dtos.TagDTO;

public class Mapper {

    public static Post dtoToPost(PostDTO dto, Set<Tag> tags, List<Comment> comments) {
        Post post = new Post(
            dto.getId(),
            dto.getTitle(),
            dto.getThumb(),
            dto.getMiniature(),
            dto.getThumbAlt(),
            dto.getPostUrl(),
            dto.getDescription(),
            dto.getContent(),
            dto.getCreatedAt(),
            dto.getUpdatedAt(),
            dto.getViews(),
            dto.getLikes()
        );
        post.setTags(tags);
        post.setComments(comments);

        return post;
    }

    public static Post dtoToPost(PostDTO dto) {
        return dtoToPost(dto, new HashSet<>(), new ArrayList<>());
    }

    public static PostDTO postToDto(Post post) {
        PostDTO dto = new PostDTO(
            post.getId(),
            post.getTitle(),
            post.getThumb(),
            post.getMiniature(),
            post.getThumbAlt(),
            post.getPostUrl(),
            post.getDescription(),
            post.getContent(),
            post.getCreatedAt(),
            post.getUpdatedAt(),
            post.getViews(),
            post.getLikes()
        );

        post.getComments().forEach(comment -> dto.getComments().add(commentToDto(comment)));

        post.getTags().forEach(tag -> dto.getTags().add(tagToDTO(tag)));

        return dto;
    }

    public static Comment dtoToComment(CommentDTO dto, Post post) {
        Comment comment = new Comment(
            dto.getId(),
            dto.getContent(),
            dto.getCreatedAt(),
            dto.getUpdatedAt(),
            dto.getLikes(),
            dto.getDislikes(),
            post
        );
        return comment;
    }

    public static Comment dtoToComment(CommentDTO dto) {
        return dtoToComment(dto, null);
    }

    public static CommentDTO commentToDto(Comment comment) {
        CommentDTO dto = new CommentDTO(
            comment.getId(),
            comment.getContent(),
            comment.getCreatedAt(),
            comment.getUpdatedAt(),
            comment.getLikes(),
            comment.getDislikes(),
            comment.getPost().getId()
        );
        return dto;
    }

    public static Tag dtoToTag(TagDTO dto, Set<Post> posts) {
        Tag tag = new Tag(dto.getId(), dto.getTag());
        tag.setPosts(posts);
        return tag;
    }

    public static Tag dtoToTag(TagDTO dto) {
        return dtoToTag(dto, new HashSet<>());
    }

    public static TagDTO tagToDTO(Tag tag) {
        TagDTO dto = new TagDTO(tag.getId(), tag.getTag());
        tag.getPosts().forEach(post -> dto.getPostsIds().add(post.getId()));
        return dto;
    }
}
