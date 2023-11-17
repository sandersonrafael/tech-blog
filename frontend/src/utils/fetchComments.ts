import comment from '@/types/Comment';

const fetchComments = async(url: string) => {
  const reqData = await fetch(url);
  const posts: comment[] = await reqData.json();

  // temp
  posts.forEach((comment) => {
    comment.createdAt = new Date(comment.createdAt);
    comment.authorId = Math.ceil(Math.random() * 3);
    comment.postId = Math.ceil(Math.random() * 4);
  });

  return posts;
};

export default fetchComments;
