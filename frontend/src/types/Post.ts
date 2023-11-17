import Tag from './Tag';

type Post = {
  id: number;
  thumb: string;
  thumbAlt: string;
  miniature: string;
  tags: Tag[];
  title: string;
  description: string;
  postUrl: string;
  createdAt: Date;
  updatedAt: Date;
  views: number;
  likes: number;
};

export default Post;
