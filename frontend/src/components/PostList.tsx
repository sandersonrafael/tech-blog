import Post from '@/types/entities/Post';
import PostCard from './cards/PostCard';
import Pagination from './Pagination';
import { useEffect, useState } from 'react';

const PostList = ({ posts }: { posts: Post[] }) => {

  const [page, setPage] = useState<number>(1);
  const interval = 12;

  useEffect(() => scrollTo({ top: 135, behavior: 'smooth' }), [page]);

  return (
    <main className="container mx-auto xl:max-w-6xl px-3 md:px-6 mt-6 mb-12">
      <h1 className="text-center text-3xl font-semibold mb-12">Todos os Posts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {posts.map((post, index) => (index >= (page - 1) * interval && index < page * interval) && (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
      {posts.length > interval &&
        <Pagination anyArray={posts} interval={interval} selectedPage={page} selectPage={setPage} />
      }
    </main>
  );
};

export default PostList;
