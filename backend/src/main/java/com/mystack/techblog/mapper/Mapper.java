package com.mystack.techblog.mapper;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.mystack.techblog.entities.Comment;
import com.mystack.techblog.entities.Post;
import com.mystack.techblog.entities.Tag;
import com.mystack.techblog.entities.User;
import com.mystack.techblog.entities.dtos.CommentDTO;
import com.mystack.techblog.entities.dtos.PostDTO;
import com.mystack.techblog.entities.dtos.TagDTO;
import com.mystack.techblog.entities.dtos.UserDTO;

public class Mapper {

    public static Post dtoToPost(PostDTO dto, Set<Tag> tags, List<Comment> comments, Set<User> usersLikes) {
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
            comments,
            tags,
            usersLikes
        );
        post.setTags(tags);
        post.setComments(comments);

        return post;
    }

    public static Post dtoToPost(PostDTO dto) {
        return dtoToPost(dto, new HashSet<>(), new ArrayList<>(), new HashSet<>());
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
            post.getTags().stream().map(tag -> tagToDTO(tag)).toList(),
            post.getComments().stream().map(comment -> commentToDto(comment)).toList(),
            post.getUsersLikes().stream().map(user -> userToDto(user)).toList()
        );

        return dto;
    }

    public static Comment dtoToComment(CommentDTO dto, Post post, User user) {
        Comment comment = new Comment(
            dto.getId(),
            dto.getContent(),
            dto.getCreatedAt(),
            dto.getUpdatedAt(),
            dto.getLikes(),
            dto.getDislikes(),
            post,
            user
        );
        return comment;
    }

    public static CommentDTO commentToDto(Comment comment) {
        CommentDTO dto = new CommentDTO(
            comment.getId(),
            comment.getContent(),
            comment.getCreatedAt(),
            comment.getUpdatedAt(),
            comment.getLikes(),
            comment.getDislikes(),
            comment.getPost().getId(),
            comment.getUser().getId()
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

    public static UserDTO userToDto(User user) {
        UserDTO dto = new UserDTO(
            user.getId(),
            user.getFirstName(),
            user.getLastName(),
            user.getProfileImg()
        );
        return dto;
    }
}
