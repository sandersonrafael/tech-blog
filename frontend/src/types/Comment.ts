type comment = {
  id: number;
  authorId: number;
  postId: number;
  createdAt: Date;
  lastModify: Date;
  content: string;
  likes: number;
  dislikes: number;
};

export default comment;
