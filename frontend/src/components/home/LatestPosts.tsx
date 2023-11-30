import Post from '@/types/Post';
import HorizontalPostCard from '../cards/HorizontalPostCard';
import Pagination from '../Pagination';
import { useEffect, useState } from 'react';

const LatestPosts = ({ latestPosts }: { latestPosts: Post[] }) => {
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [interval] = useState<number>(4);
  const [showablePosts, setShowablePosts] = useState<Post[]>([]);

  useEffect(() => {
    setShowablePosts(latestPosts.filter((_, i) => i < 24));
  }, [latestPosts]);

  return (
    <div className="mt-12 w-full">
      <h2 className="pb-1">Posts Recentes</h2>

      <hr className="bg-gray-600 mb-7" />

      {showablePosts.map((post, index) => ((selectedPage - 1) * 4 <= index && index < selectedPage * 4) && (
        <HorizontalPostCard key={post.id} {...post} />
      ))}

      <Pagination anyArray={showablePosts} interval={interval} selectPage={setSelectedPage} selectedPage={selectedPage} />
    </div>
  );
};

export default LatestPosts;
