import FeaturedPost from './FeaturedPost';
import PostCard from '../cards/PostCard';

import { useContext, useEffect, useState } from 'react';
import { sortDes } from '@/utils/sort';
import PostsContext from '@/contexts/PostsContext';
import Post from '@/types/Post';

const FeaturedPosts = () => {
  const { posts } = useContext(PostsContext);
  const [localPosts, setLocalPosts] = useState<Post[]>([]);
  const [featuredPost, setFeaturedPost] = useState<Post | {}>({});

  useEffect(() => {
    const postsArray: Post[] = [...sortDes(posts, 'createdAt')];
    const newFeaturedPost = postsArray.shift() as Post;

    setFeaturedPost(newFeaturedPost);
    setLocalPosts(sortDes(postsArray, 'views'));
  }, [posts]);

  return (
    <section className="max-w-lg sm:container mx-auto xl:max-w-6xl md:px-6 px-3">
      <h2 className="py-7">Posts em Destaque</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-6 w-full">
        {localPosts.length > 0 &&
          <FeaturedPost {...(featuredPost as Post)} className="col-span-1 sm:col-span-2" />
        }

        {localPosts.length > 0 && sortDes(localPosts, 'usersLikes').map((post, index) => index <= 3 && (
          <PostCard key={post.id} {...post} description="" className="col-span-1" />
        ))}
      </div>
    </section>
  );
};

export default FeaturedPosts;
