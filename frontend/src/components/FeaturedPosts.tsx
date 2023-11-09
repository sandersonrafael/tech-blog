import FeaturedPost from './FeaturedPost';
import PostCard from './PostCard';

const FeaturedPosts = () => {
  return (
    <section className="container mx-auto xl:max-w-6xl md:px-6 px-3">
      <h5 className="py-7">Posts em Destaque</h5>

      <div className="flex gap-5 ">
        <div className="w-2/3">
          <FeaturedPost />
        </div>

        <div className="w-1/3">
          <PostCard />
        </div>
      </div>
    </section>
  );
};

export default FeaturedPosts;
