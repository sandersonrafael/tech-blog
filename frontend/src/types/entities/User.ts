type User = {
  id: number;
  firstName: string;
  lastName: string;
  profileImg: string;
  // createdAt: Date; -> informações não transferíveis no DTO
  // lastProfileUpdate: Date; -> informações não transferíveis no DTO
  // username: string; -> informações não transferíveis no DTO | ver se salva só email ou username também
  // email: string; -> informações não transferíveis no DTO | ver se salva só email ou username também
  // password: string; -> informações não transferíveis no DTO
};

export default User;
