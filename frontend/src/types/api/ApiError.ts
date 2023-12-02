type ApiError = {
  url: string;
  method: string;
  status: number;
  message: string;
  timestamp: Date;
};

export default ApiError;
