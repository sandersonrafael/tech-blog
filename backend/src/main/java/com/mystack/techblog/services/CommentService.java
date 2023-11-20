package com.mystack.techblog.services;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mystack.techblog.entities.Comment;
import com.mystack.techblog.entities.Post;
import com.mystack.techblog.entities.dtos.CommentDTO;
import com.mystack.techblog.repositories.CommentRepository;
import com.mystack.techblog.repositories.PostRepository;

@Service // TODO -> refactorar tudo envolvendo os Mappers para os Mappers personalizados e ModelMapper
public class CommentService {

    @Autowired
    private CommentRepository repository;

    @Autowired
    private PostRepository postRepository;

    public List<CommentDTO> findAll() {
        List<Comment> dbComments = repository.findAll();

        List<CommentDTO> dtoComments = dbComments.stream().map(comment -> {
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
        }).toList();

        return dtoComments;
    }

    public CommentDTO findById(Long id) {
        Comment comment = repository.findById(id)
            .orElse(null);
        if (comment == null) return null;

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

    public CommentDTO create(CommentDTO dto) {
        dto.setLikes(0);
        dto.setDislikes(0);
        dto.setCreatedAt(new Date());
        dto.setUpdatedAt(new Date());

        Post post = postRepository.findById(dto.getPostId()).orElse(null);
        if (post == null) return null;

        Comment comment = new Comment(
            null,
            dto.getContent(),
            dto.getCreatedAt(),
            dto.getUpdatedAt(),
            dto.getLikes(),
            dto.getDislikes(),
            post
        );

        Comment persisted = repository.save(comment);
        dto.setId(persisted.getId());
        return dto;
    }

    public CommentDTO update(Long id, CommentDTO dto) {
        Comment dbComment = repository.findById(id).orElse(null);
        Post dbPost = postRepository.findById(dto.getPostId()).orElse(null);

        if (dbComment == null) return null;
        if (dbPost == null) return null;
        if (dto.getContent() == null || dto.getContent() == "") return null;

        dbComment.setContent(dto.getContent());
        dbComment.setUpdatedAt(new Date());

        Comment persisted = repository.save(dbComment);

        CommentDTO newDto = new CommentDTO(
            persisted.getId(),
            persisted.getContent(),
            persisted.getCreatedAt(),
            persisted.getUpdatedAt(),
            persisted.getLikes(),
            persisted.getDislikes(),
            persisted.getPost().getId(),
            persisted.getUser().getId()
        );
        return newDto;
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
