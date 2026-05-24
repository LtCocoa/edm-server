import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/requests/create-user.request-dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { JwtPayload } from './types';

@Injectable()
export class AuthService {
  constructor (
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(registerDto: CreateUserDto) {
    return this.usersService.create(registerDto);
  }

  async validateUser(login: string, password: string) {
    const user = await this.usersService.findOneByLogin(login);
    if (user?.password == password) {
      return user;
    }

    return null;
  }

  async login(user: User) {
    const payload: JwtPayload = { username: user.name, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
