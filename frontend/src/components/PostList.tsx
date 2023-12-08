import Post from '@/types/entities/Post';
import PostCard from './cards/PostCard';
import Pagination from './Pagination';
import { useEffect, useState } from 'react';
import { sortAsc, sortDes } from '@/utils/sort';

type SortType = 'newest' | 'oldest' | 'views_des' | 'views_asc' | 'likes_des' | 'likes_asc';

type PostListTypes = {
  posts: Post[];
  title: string;
  sort: SortType;
  noResults: string;
};

const getSortedPosts = (posts: Post[], sort: SortType): Post[] => {
  if (sort === 'oldest' || sort === 'views_asc' || sort === 'likes_asc') {
    return sortAsc([...posts], sort === 'oldest' ? 'createdAt' : sort === 'views_asc' ? 'views' : 'usersLikes');
  }

  return sortDes([...posts], sort === 'newest' ? 'createdAt' : sort === 'views_des' ? 'views' : 'usersLikes');
};

const PostList = ({ posts, title, sort, noResults }: PostListTypes) => {
  const sortedPosts = getSortedPosts(posts, sort);

  const [page, setPage] = useState<number>(1);
  const interval = 12;

  useEffect(() => scrollTo({ top: 0, behavior: 'smooth' }), [page]);

  return (
    <main className="container mx-auto xl:max-w-6xl px-3 md:px-6 mt-12 mb-16">
      <h1 className="text-center text-3xl font-semibold mb-16">{title}</h1>

      {posts.length === 0 &&
        <h2 className="text-center text-2xl font-medium mt-24 mb-36 min-h-fit">{noResults}</h2>
      }

      {posts.length > 0 &&
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {sortedPosts.map((post, index) => (index >= (page - 1) * interval && index < page * interval) && (
            <PostCard key={post.id} {...post} />
          ))}
        </div>
      }

      {sortedPosts.length > interval &&
        <Pagination anyArray={sortedPosts} interval={interval} selectedPage={page} selectPage={setPage} />
      }
    </main>
  );
};

export default PostList;
