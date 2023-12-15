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
import Modal from '@/components/Modal';

const getJwt = () => localStorage.getItem('jwt') as string;

const PostPage = () => {
  const { user, setUser } = useContext(UserContext);
  const { posts, setPosts, setComments } = useContext(PostsContext);
  const [post, setPost] = useState<Post>();
  const [newComment, setNewComment] = useState<string>('');
  const [newCommentError, setNewCommentError] = useState<string>();
  const [showRequestLogin, setShowRequestLogin] = useState<boolean>(false);

  const [loadingPost, setLoadingPost] = useState<boolean>(true);
  const [loadingLikePost, setLoadingLikePost] = useState<boolean>(false);
  const [loadingAddComment, setLoadingAddComment] = useState<boolean>(false);

  const postUrl = useParams().postUrl as string;
  const postId = posts.find((post) => post.postUrl === postUrl)?.id;

  const [commentsExpands, setCommentsExpands] = useState<number>(1);
  const [commentsLength, setCommentsLength] = useState<number>(4);

  const handleLoadMoreComments = () => {
    if (commentsLength === 10) setCommentsExpands((expand) => expand + 1);
    if (commentsLength === 4) setCommentsLength(10);
  };

  const handleLikePost = async () => {
    if (!user || !post) return setShowRequestLogin(true);

    const thisUser = { id: user.id, firstName: user.firstName, lastName: user.lastName, profileImg: user.profileImg };

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

  const handleChangeNewComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    setNewComment(
      value.length > 1000 ? value.slice(0, 1000) : value,
    );
  };

  const handleAddComment: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!user) return;

    if (newComment === '' || newComment.trim() === '') {
      setNewComment('');
      return setNewCommentError('Não é permitido adicionar comentários em branco');
    }

    setLoadingAddComment(true);

    if (getJwt()) {
      const response = await api.createComment(postId as number, newComment.trim(), getJwt());
      const { error } = response as { error: string };
      if (error) {
        setNewCommentError(error);
        setLoadingAddComment(false);
        return;
      }

      const comment = { ...response } as Comment;
      const updatedPost = { ...post } as Post;
      updatedPost.comments?.push(comment);
      setPost(updatedPost);
      setPosts((posts) => posts.map((post) => post.id === updatedPost.id ? { ...updatedPost } : post));

      const updatedComments: Comment[] = [];
      posts.forEach((post) => post.comments.forEach((comment) => updatedComments.push(comment)));
      setComments([...updatedComments]);

      if (post && post.comments.length > (commentsExpands * commentsLength)) handleLoadMoreComments();

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

  useEffect(() => setNewCommentError(''), [newComment]);

  return (
    <>
      <Modal showModal={showRequestLogin} setShowModal={setShowRequestLogin}>
        <div className="text-center text-sm">
          <p className="mb-1">É necessário estar logado para curtir o Post</p>
          <p>Faça login ou cadastre-se e tente novamente</p>
        </div>
      </Modal>

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
                {post.comments.length > 0 &&
                  <span className="text-xs px-1 mb-1">
                    Exibindo {(commentsExpands * commentsLength) >= post.comments.length
                      ? post.comments.length
                      : (commentsExpands * commentsLength)
                    } de {post.comments.length} comentário{post.comments.length !== 1 && 's'}
                  </span>
                }

                {sortAsc(post.comments, 'createdAt').map((comment, index) => {
                  if (index < (commentsExpands * commentsLength))
                    return (
                      <PostCommentCard
                        key={comment.id}
                        actualComment={comment}
                        postId={comment.postId}
                        deleteCommentFromPost={deleteCommentFromPost}
                      />
                    ); })}

                {post.comments.length > commentsLength * commentsExpands &&
                  <button
                    className="mt-6 border-b-4 border-black py-1 bg-gray-900 rounded-sm text-white
                      opacity-50 hover:opacity-60 transition-all duration-300"
                    type="button"
                    onClick={handleLoadMoreComments}>
                    Carregar mais...
                  </button>
                }

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
                      border focus:border-blue-400 outline-none transition-all
                    `}
                    placeholder="Conte-nos sua opinião, dúvida ou sugestão..."
                    name="new_comment"
                    value={newComment}
                    onChange={handleChangeNewComment}
                  ></textarea>

                  {newCommentError &&
                    <span className="text-xs text-center text-red-500">{newCommentError}</span>
                  }

                  <button
                    className={`
                      rounded text-white h-9 transition-colors duration-300 flex items-center justify-center mt-3
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
