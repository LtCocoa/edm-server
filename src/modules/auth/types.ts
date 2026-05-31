export interface JwtPayload {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    middleName: string;
    role: string;
  }
}

export interface UserRequestJwt {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  role: string;
}