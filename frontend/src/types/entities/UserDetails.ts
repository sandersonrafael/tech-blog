type UserDetails = {
  id: number;
  firstName: string;
  lastName: string;
  profileImg: string;
  createdAt: Date;
  role: 'ADMIN' | 'USER';
  commentsIds: number[];
  postsLikesIds: number[]
  commentsLikesIds: number[];
  commentsDislikesIds: number[];
};

export default UserDetails;
