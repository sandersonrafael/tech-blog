'use client';

import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';

import IconEye from '@/icons/IconEye';
import IconHeart from '@/icons/IconHeart';
import UserContext from '@/contexts/UserContext';
import IconHeartFill from '@/icons/IconHeartFill';
import PostsContext from '@/contexts/PostsContext';
import PostCommentCard from '@/components/cards/PostCommentCard';

import api from '@/api/api';
import dateFormatter from '@/utils/dateFormatter';
import { sortAsc } from '@/utils/sort';

import Post from '@/types/entities/Post';

import './PostContent.css';

const PostPage = () => {
  const { user } = useContext(UserContext);
  const { posts, setPosts } = useContext(PostsContext);
  const postUrl = useParams().postUrl as string;
  const postId = posts.find((post) => post.postUrl === postUrl)?.id;

  const [post, setPost] = useState<Post>();

  const handleLikePost = async () => {
    if (!user || !post) return;
    const thisUser = { id: user.id, firstName: user.firstName, lastName: user.lastName, profileImg: user.profileImg };

    // TODO: Lógica para se não tiver logado, abrir modal informado que é necessário estar logado para completar a ação

    const jwt = localStorage.getItem('jwt');
    const userHasLike = post.usersLikes.map(({ id }) => id).indexOf(user.id) !== -1;

    if (jwt) {
      const { success } = await api.likePost(postId as number, jwt) as { success: string };

      if (success) {
        const updatedPost = { ...post };

        if (userHasLike) updatedPost.usersLikes = updatedPost.usersLikes.filter(({ id }) => id !== user.id);
        else updatedPost.usersLikes.push(thisUser);

        setPost({ ...updatedPost });
        setPosts((allPosts) => allPosts.map((thisPost) => thisPost.id === updatedPost.id ? updatedPost : thisPost));
      }
    }
  };

  const deleteCommentFromPost = (commentId: number) => {
    setPost((post) => {
      if (post) post.comments = post?.comments.filter((comment) => comment.id !== commentId);
      return post;
    });
  };

  useEffect(() => {
    scrollTo({ top: 0, behavior: 'instant' });

    const getPost = async () => {
      if (postId) {
        const dbPost = await api.getPost(postId);
        setPost(dbPost);
        setPosts((allPosts) => allPosts.map((thisPost) => thisPost.id === dbPost.id ? dbPost : thisPost));
      }
    };

    getPost();
  }, [postId, setPost, setPosts]);

  return (
    <>
      {post &&
        <div className="container mx-auto xl:max-w-4xl px-3 md:px-6 mt-12 mb-10">
          <h1 className="text-center text-2xl font-bold mb-12">{post.title}</h1>

          <div className="px-1 mb-2 flex justify-between">
            <span>{dateFormatter.inFull(post.createdAt)}</span>

            <div className="flex gap-2">
              <div className="flex gap-1">
                <span>{post.views}</span>

                <IconEye width={24} height={24} />
              </div>

              <span> | </span>

              <div className="flex gap-1">
                <span>{post.usersLikes.length}</span>

                <button
                  className="transition-all duration-300 hover:scale-110 hover:text-red-500"
                  type="button"
                  onClick={handleLikePost}
                >
                  {user && post.usersLikes.map(({ id }) => id).indexOf(user.id) !== -1
                    ? <IconHeartFill width={24} height={24} className="text-red-500" />
                    : <IconHeart width={24} height={24} />
                  }
                </button>
              </div>
            </div>
          </div>

          <Image
            className="w-full rounded-2xl shadow mb-12"
            src={post.thumb}
            alt={post.thumbAlt}
            width={960}
            height={540}
          />

          <main dangerouslySetInnerHTML={{ __html: (post.content) }} className="post-main-content" />

          <hr className="border-gray-200" />
        </div>
      }

      {post &&
        <section className="bg-gray-100">
          <div className="container mx-auto xl:max-w-4xl px-3 md:px-6">
            <h2 className="text-center font-medium text-2xl py-8">Comentários</h2>
            {/* TODO: Fazer lógica para exibir mensagem caso ainda não tenham comentários */}

            <div className="mx-auto max-w-2xl flex flex-col gap-1 pb-12">
              {sortAsc(post.comments, 'createdAt').map((comment) => (
                <PostCommentCard
                  key={comment.id}
                  actualComment={comment}
                  postId={comment.postId}
                  deleteCommentFromPost={deleteCommentFromPost} />
              ))}
            </div>
          </div>
        </section>
      }

      {!post &&
        <h1>Post não encontrado {/* TODO: Arrumar isso aqui quando não encontrar o post */} </h1>
      }
    </>
  );
};

export default PostPage;
