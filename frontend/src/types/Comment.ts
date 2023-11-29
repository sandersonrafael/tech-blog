import User from './User';

type Comment = {
  id: number;
  postId: number;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  usersLikesIds: number[];
  usersDislikesIds: number[];
  author: User;
};

export default Comment;
