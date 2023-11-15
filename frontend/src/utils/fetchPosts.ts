import Post from '@/types/Post';

const fetchPosts = async(url: string): Promise<Post[]> => {
  const reqData = await fetch(url);
  const posts: Post[] = await reqData.json();

  // temp
  posts.forEach((post) => {
    post.tags = ['Temp1', 'Temp2', 'Temp3', 'Temp4'];
    post.createdAt = new Date(post.createdAt);
  });

  return posts;
};

export default fetchPosts;
