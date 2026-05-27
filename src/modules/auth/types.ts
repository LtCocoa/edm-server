export interface JwtPayload {
  user: {
    id: string;
    name: string;
    role: string;
  }
}

export interface UserRequestJwt {
  id: string;
  name: string;
  role: string;
}