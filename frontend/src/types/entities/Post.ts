import Comment from './Comment';
import Tag from './Tag';
import User from './User';

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
  usersLikes: User[];
  comments: Comment[];
};

export default Post;
