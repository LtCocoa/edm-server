import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './users.repository';
import * as crypto from 'node:crypto';
import * as argon from 'argon2';
import { UserDto } from './dto/user.dto';

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

  async findOne(id: string) {
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    return new UserDto(user);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.updateUserById({ userId: id, ...updateUserDto });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
