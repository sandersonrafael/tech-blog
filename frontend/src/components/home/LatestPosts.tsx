import Post from '@/types/Post';
import HorizontalPostCard from '../HorizontalPostCard';

const LatestPosts = ({ latestPosts }: { latestPosts: Post[] }) => {
  return (
    <div className="mt-12 w-full">
      <h2 className="pb-1">Posts Recentes</h2>

      <hr className="bg-gray-600 mb-7" />

      {latestPosts.map((post, index) => index <= 3 && (
        <HorizontalPostCard key={post.id} {...post} />
      ))}

      <div>
        <span>{'<'}</span>
        <span> 1 </span>
        <span> 2 </span>
        <span> 3 </span>
        <span> 4 </span>
        <span> 5 </span>
        <span> 6 </span>
        <span> 7 </span>
        <span> 8 </span>
        <span>{'>'}</span>
      </div>
    </div>
  );
};

export default LatestPosts;
