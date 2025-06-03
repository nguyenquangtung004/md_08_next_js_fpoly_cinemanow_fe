export type JWTPayload = {
  userId: string;
  user_name: string;
  email?: string;
  role: number;
  iat: number;
  exp: number;
  url_image?: string;
};