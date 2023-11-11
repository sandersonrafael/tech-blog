import AboutMe from '../AboutMe';
import MiniaturePostCard from '../MiniaturePostCard';

import featuredPosts from '@/fakeApi/featuredPosts';

const SideTopics = ({ className }: { className?: string }) => {
  return (
    <aside className={`${className} lg:ml-4`}>
      <AboutMe />

      <h2 className="mt-12 pb-1">Mais Populares</h2>
      <hr className="bg-gray-600 mb-7" />

      <div className="grid my-6 gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-1">
        {featuredPosts.map((post, index) => index <= 3 && (
          <MiniaturePostCard key={post.id} {...post} miniatureType={1} />
        ))}
      </div>

      <h2 className="mt-12 pb-1">Últimos Comentários</h2>
      <hr className="bg-gray-600 mb-7" />
    </aside>
  );
};

export default SideTopics;
