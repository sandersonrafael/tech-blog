'use client';

import React, { ChangeEvent, FormEventHandler, KeyboardEvent, useContext, useEffect, useState } from 'react';
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
import Comment from '@/types/entities/Comment';
import Loading from '@/components/Loading';

const getJwt = () => localStorage.getItem('jwt') as string;

const PostPage = () => {
  const { user, setUser } = useContext(UserContext);
  const { posts, setPosts } = useContext(PostsContext);
  const [post, setPost] = useState<Post>();
  const [newComment, setNewComment] = useState<string>('');

  const [loadingPost, setLoadingPost] = useState<boolean>(true);
  const [loadingLikePost, setLoadingLikePost] = useState<boolean>(false);
  const [loadingAddComment, setLoadingAddComment] = useState<boolean>(false);

  const postUrl = useParams().postUrl as string;
  const postId = posts.find((post) => post.postUrl === postUrl)?.id;

  const handleLikePost = async () => {
    if (!user || !post) return;
    const thisUser = { id: user.id, firstName: user.firstName, lastName: user.lastName, profileImg: user.profileImg };

    // TODO: Lógica para se não tiver logado, abrir modal informado que é necessário estar logado para completar a ação

    const userHasLike = post.usersLikes.map(({ id }) => id).indexOf(user.id) !== -1;

    if (getJwt()) {
      setLoadingLikePost(true);
      const { success } = await api.likePost(postId as number, getJwt()) as { success: string };

      if (success) {
        const updatedPost = { ...post };

        if (userHasLike) updatedPost.usersLikes = updatedPost.usersLikes.filter(({ id }) => id !== user.id);
        else updatedPost.usersLikes.push(thisUser);

        setPost({ ...updatedPost });
        setPosts((allPosts) => allPosts.map((thisPost) => thisPost.id === updatedPost.id ? updatedPost : thisPost));
      }
      setLoadingLikePost(false);
    }
  };

  const handleAddComment: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!user) return;

    setLoadingAddComment(true);

    if (getJwt()) {
      const response = await api.createComment(postId as number, newComment, getJwt());
      const { error } = response as { error: string };
      if (error) return; // TODO: Fazer lógica para avisar erro ao tentar enviar

      const comment = { ...response } as Comment;
      const updatedPost = { ...post } as Post;
      updatedPost.comments?.push(comment);
      setPost(updatedPost);
      setPosts((posts) => posts.map((post) => post.id === updatedPost.id ? { ...updatedPost } : post));
      setUser((user) => {
        user?.commentsIds.push(comment.id);
        return user;
      });
      setNewComment('');
    }
    setLoadingAddComment(false);
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
      setLoadingPost(false);
    };

    getPost();
  }, [postId, setPost, setPosts]);

  return (
    <>
      {post &&
        <>
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
                    {loadingLikePost
                      ? <Loading diameter={24} color="rgb(239 68 68)" />
                      : user && post.usersLikes.map(({ id }) => id).indexOf(user.id) !== -1
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

          <section className="bg-gray-100">
            <div className="container mx-auto xl:max-w-4xl px-3 md:px-6">
              <h2 className="text-center font-medium text-2xl py-8">Comentários</h2>

              <div className="mx-auto max-w-2xl flex flex-col gap-1 pb-12">
                {sortAsc(post.comments, 'createdAt').map((comment) => (
                  <PostCommentCard
                    key={comment.id}
                    actualComment={comment}
                    postId={comment.postId}
                    deleteCommentFromPost={deleteCommentFromPost} />
                ))}

                {post.comments.length === 0 &&
                <p className="text-center">Ainda não há comentários. Seja o primeiro a comentar...</p>
                }
              </div>

              <div className="pb-3 max-w-2xl mx-auto">
                <h2 className="text-sm pb-2">Deixe seu comentário</h2>

                <hr className="w-12 border-black border-2"/>
                <hr className="mb-6"/>

                <form
                  className="flex flex-col pb-12"
                  onSubmit={handleAddComment}
                  onKeyDown={(e: KeyboardEvent<HTMLFormElement>) => { if (e.key === 'Enter' && !e.shiftKey) handleAddComment(e); }}
                >
                  <textarea
                    className={`
                      w-full h-36 sm:h-24 px-3 py-2 text-sm resize-none focus:shadow rounded-md
                      mb-3 border focus:border-blue-400 outline-none transition-all
                    `}
                    placeholder="Conte-nos sua opinião, dúvida ou sugestão..."
                    name="new_comment"
                    value={newComment}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setNewComment(e.target.value)}
                  ></textarea>

                  <button
                    className={`
                      rounded text-white h-9 transition-colors duration-300 flex items-center justify-center
                      ${user ? 'bg-blue-400 hover:bg-blue-500 cursor-pointer' : 'cursor-not-allowed bg-gray-400'}
                    `}
                    type="submit"
                    disabled={!user}
                  >
                    {loadingAddComment
                      ? <Loading diameter={18} color="white" />
                      : <span>
                        {user && 'Enviar'}
                        {!user && 'Entre ou registre-se para enviar'}
                      </span>
                    }
                  </button>
                </form>
              </div>
            </div>
          </section>
        </>
      }

      {!post &&
        <div className="h-64 sm:h-80 mt-12 mb-16 flex flex-col justify-center items-center">
          {loadingPost &&
            <Loading diameter={48} />
          }
          {loadingPost === false &&
            <h1 className="text-center text-4xl font-medium px-3 my-auto">Erro 404 - Página não encontrada</h1>
          }
        </div>
      }
    </>
  );
};

export default PostPage;
