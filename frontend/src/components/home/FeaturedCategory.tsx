import PostCard from '../cards/PostCard';

import Post from '@/types/entities/Post';

const FeaturedCategory = ({ featuredPosts }: { featuredPosts: Post[] }) => {
  return (
    <div>
      <h2 className="pb-1">Dicas e Tutoriais</h2>

      <hr className="bg-gray-600 mb-7" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {featuredPosts.map((post, index) => index <=3 && (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedCategory;
