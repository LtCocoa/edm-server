import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserRequestDto } from './dto/requests/create-user.request-dto';
import { UpdateUserRequestDto } from './dto/requests/update-user.request-dto';
import { UsersRepository } from './users.repository';
import * as crypto from 'node:crypto';
import * as argon from 'argon2';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
  ) {}

  async create(createUserDto: CreateUserRequestDto) {
    try {
      const foundUser = await this.usersRepository.findUserByLogin(createUserDto.login);

      if (foundUser) {
        throw new ConflictException(`Username is already taken.`);
      }

      const salt = crypto.randomBytes(32);
      const hash = await argon.hash(createUserDto.password, { salt });

      const newUser = await this.usersRepository.createUser({
        passwordHash: hash,
        passwordSalt: salt.toString('hex'),
        role: {
          id: createUserDto.roleId
        },
        ...createUserDto
      });

      return newUser;
    } catch (err) {
      throw err;
    }
  }

  findAll() {
    return this.usersRepository.findAllUsers();
  }

  findOneById(id: string) {
    return this.usersRepository.findUserById(id);
  }

  findOneByLogin(login: string) {
    return this.usersRepository.findUserByLogin(login);
  }

  update(id: string, updateUserDto: UpdateUserRequestDto) {
    return this.usersRepository.updateUserById({ id, ...updateUserDto });
  }

  async delete(id: string) {
    const userDeleted = await this.usersRepository.deleteUserById(id);
    if (userDeleted) {
      return;
    }
    throw new NotFoundException('User not found.');
  }
}
