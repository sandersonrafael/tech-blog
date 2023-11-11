type Post = {
  id: number;
  thumb: string;
  thumbAlt: string;
  miniature: string;
  tags: string[];
  title: string;
  description: string;
  postUrl: string;
  date: Date;
  views: number;
  likes: number;
};

export default Post;
