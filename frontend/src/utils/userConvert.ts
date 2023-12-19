import User from '@/types/entities/User';
import UserDetails from '@/types/entities/UserDetails';

const userConvert = (user: UserDetails): User => {
  const { id, firstName, lastName, profileImg } = user;
  return { id, firstName, lastName, profileImg };
};

export default userConvert;
