import { useContext, useEffect, useState } from 'react';
import FeaturedCategory from './FeaturedCategory';

import LatestPosts from './LatestPosts';
import PostsContext from '@/contexts/PostsContext';
import { sortDes } from '@/utils/sort';
import Post from '@/types/entities/Post';

const MainTopics = ({ className }: { className?: string }) => {
  const { posts } = useContext(PostsContext);
  const [localPosts, setLocalPosts] = useState<Post[]>([]);

  useEffect(() => {
    setLocalPosts([...posts]);
  }, [posts]);

  return (
    <section className={`${className}`}>
      {localPosts.length > 0 &&
        <FeaturedCategory featuredPosts={sortDes(localPosts, 'views')} />
      }

      {localPosts.length > 0 &&
        <LatestPosts latestPosts={sortDes(localPosts, 'createdAt')} />
      }
    </section>
  );
};

export default MainTopics;
