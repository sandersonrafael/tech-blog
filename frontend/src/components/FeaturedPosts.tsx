import FeaturedPost from './FeaturedPost';
import PostCard from './PostCard';

import featuredPosts from '@/fakeApi/featuredPosts';

const FeaturedPosts = () => {
  return (
    <section className="container mx-auto xl:max-w-6xl md:px-6 px-3">
      <h5 className="py-7">Posts em Destaque</h5>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-6 gap-y-6 w-full">
        <FeaturedPost className="col-span-2" />

        {featuredPosts.map((post, index) => index <= 3 && (
          <PostCard key={post.id} {...post} description="" className="col-span-1" />
        ))}
      </div>
    </section>
  );
};

export default FeaturedPosts;
