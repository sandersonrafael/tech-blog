'use client';

import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';

import PostsContext from '@/contexts/PostsContext';

import Post from '@/types/entities/Post';
import api from '@/api/api';
import dateFormatter from '@/utils/dateFormatter';

import './PostContent.css';
import IconEye from '@/icons/IconEye';
import IconHeart from '@/icons/IconHeart';
import UserContext from '@/contexts/UserContext';
import IconHeartFill from '@/icons/IconHeartFill';

const PostPage = () => {
  const { user } = useContext(UserContext);
  const { posts, setPosts } = useContext(PostsContext);
  const postUrl = useParams().postUrl as string;
  const postId = posts.find((post) => post.postUrl === postUrl)?.id;

  const [post, setPost] = useState<Post>();

  const handleLikePost = async () => {
    if (!user || !post) return;
    // TODO: Lógica para se não tiver logado, abrir modal informado que é necessário estar logado para completar a ação

    const jwt = localStorage.getItem('jwt');
    const userHasLike = post.usersLikes.map(({ id }) => id).indexOf(user.id) !== -1;

    post.usersLikes.map(({ id }) => id).indexOf(user.id);
    if (jwt) {
      const { success } = await api.likePost(postId as number, jwt) as { success: string };
      if (success) {
        const updatedPost = { ...post };
        if (userHasLike) {
          updatedPost.usersLikes = updatedPost.usersLikes.filter(({ id }) => id !== user.id);
        } else {
          updatedPost.usersLikes.push({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            profileImg: user.profileImg,
          });
        }

        setPost({ ...updatedPost });
      }
    }
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
    <div className="container mx-auto xl:max-w-4xl px-3 md:px-6 mt-12 mb-16">
      {post &&
        <>
          <h1 className="text-center text-2xl font-bold mb-12">{post.title}</h1>

          <div className="px-1 mb-1 flex justify-between">
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
        </>
      }

      {!post &&
        <h1>Post não encontrado</h1>
      }
    </div>
  );

};

export default PostPage;
