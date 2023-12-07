import AboutMe from '../cards/AboutMe';
import MiniaturePostCard from '../cards/MiniaturePostCard';
import CommentCard from '../cards/CommentCard';

import { sortDes, sortRandom } from '@/utils/sort';
import { useContext, useEffect, useState } from 'react';
import PostsContext from '@/contexts/PostsContext';
import Post from '@/types/entities/Post';
import Comment from '@/types/entities/Comment';

const SideTopics = ({ className = '' }: { className?: string }) => {
  const { posts, comments } = useContext(PostsContext);
  const [localPosts, setLocalPosts] = useState<Post[]>([]);
  const [localComments, setLocalComments] = useState<Comment[]>([]);

  useEffect(() => {
    setLocalPosts([...posts]);
    setLocalComments([...comments]);
  }, [posts, comments]);

  return (
    <aside className={`${className} lg:ml-4`}>
      <AboutMe />

      <h2 className="mt-12 pb-1">Posts Populares</h2>
      <hr className="bg-gray-600 mb-7" />

      <div className="grid my-6 gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-1">
        {localPosts.length > 0 && sortRandom(posts).map((post, index) => index <= 3 && (
          <MiniaturePostCard key={post.id} {...post} miniatureType={1} />
        ))}
      </div>

      <h2 className="mt-12 pb-1">Últimos Comentários</h2>
      <hr className="bg-gray-600 mb-7" />

      {localComments.length > 0 && sortDes(localComments, 'createdAt').map((comment, index) => index <= 2 && (
        <CommentCard
          key={comment.id}
          {...comment}
          post={(localPosts.find(({ comments }) => comments.map(({ id }) => id).indexOf(comment.id) !== -1)) as Post}
        />
      ))}
    </aside>
  );
};

export default SideTopics;
