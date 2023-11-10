import FeaturedCategory from './FeaturedCategory';

import featuredPosts from '@/fakeApi/featuredPosts';

const MainTopics = ({ className }: { className?: string }) => {
  return (
    <section className={className}>
      <FeaturedCategory featuredPosts={featuredPosts} />

    </section>
  );
};

export default MainTopics;
