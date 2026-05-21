export interface JwtPayload {
  sub: string;
  username: string;
}

export interface ProfileResponse {
  userId: string;
  name: string;
}