export interface JwtPayload {
  sub: string;
  username: string;
  role: string;
}

export interface UserRequestJwt {
  userId: string;
  name: string;
  role: string;
}