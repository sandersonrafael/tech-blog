'use client';
import AboutMe from '../AboutMe';
import MiniaturePostCard from '../MiniaturePostCard';
import CommentCard from '../CommentCard';

import { sortLast } from '@/utils/sort';

// temp data -> need to remove after backend implementation

import comments from '@/fakeApi/comments';
import featuredPosts from '@/fakeApi/featuredPosts';
import users from '@/fakeApi/users';
import User from '@/types/User';
import Post from '@/types/Post';
import { useEffect, useState } from 'react';
import fetchPosts from '@/utils/fetchPosts';

// temp function -> need to remove after backend implementation
const getAuthor = (authorId: number) => (users as User[]).find(({ id }) => id === authorId) as User;
const getPost = (postId: number) => (featuredPosts as Post[]).find(({ id }) => id === postId) as Post;

const SideTopics = ({ className }: { className?: string }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async() => {
      const loadedPosts = await fetchPosts('http://localhost:8080/api/posts');
      setPosts([...loadedPosts]);
    };

    fetchData();
  }, []);
  return (
    <aside className={`${className} lg:ml-4`}>
      <AboutMe />

      <h2 className="mt-12 pb-1">Posts Populares</h2>
      <hr className="bg-gray-600 mb-7" />

      <div className="grid my-6 gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-1">
        {posts.map((post, index) => index <= 3 && (
          <MiniaturePostCard key={post.id} {...post} miniatureType={1} />
        ))}
      </div>

      <h2 className="mt-12 pb-1">Últimos Comentários</h2>
      <hr className="bg-gray-600 mb-7" />

      {sortLast(comments, 'createdAt').map((comment, index) => index <= 2 && (
        <CommentCard
          key={comment.id}
          {...comment}
          author={getAuthor(comment.authorId)}
          post={getPost(comment.postId)}
        />
      ))}
    </aside>
  );
};

export default SideTopics;
