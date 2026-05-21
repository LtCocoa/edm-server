import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './users.repository';
import * as crypto from 'node:crypto';
import * as argon from 'argon2';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const foundUser = await this.userRepository.findUserByLogin(createUserDto.login);

    if (foundUser) {
      throw new ConflictException(`Username is already taken.`);
    }

    const salt = crypto.randomBytes(32);
    const hash = await argon.hash(createUserDto.password, { salt });

    const newUser = await this.userRepository.createUser({
      passwordHash: hash,
      passwordSalt: salt.toString('hex'),
      ...createUserDto
    });

    return newUser.userId;
  }

  findAll() {
    return this.userRepository.findAllUsers();
  }

  findOneById(id: string) {
    return this.userRepository.findUserById(id);
  }

  findOneByLogin(login: string) {
    return this.userRepository.findUserByLogin(login);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.updateUserById({ userId: id, ...updateUserDto });
  }

  async delete(id: string) {
    const userDeleted = await this.userRepository.deleteUserById(id);
    if (userDeleted) {
      return;
    }
    throw new NotFoundException('User not found.');
  }
}
