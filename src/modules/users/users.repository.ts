import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { DeepPartial, Repository } from "typeorm";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { DeleteResult } from "typeorm/browser";

export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async createUser<T extends DeepPartial<User>>(entity: T): Promise<User> {
    try {
      const savedUser = await this.userRepository.save(entity);
      return savedUser;
    } catch (error: unknown) {
      throw new BadRequestException((error as Error).message);
    }
  }

  findAllUsers() {
    return this.userRepository.find();
  }

  findUserByLogin(login: string): Promise<User | null> {
    return this.userRepository.findOneBy({ login });
  }

  findUserById(userId: string): Promise<User | null> {
    return this.userRepository.findOneBy({ userId });
  }

  updateUserById(params: DeepPartial<User>) {
    return this.userRepository.update({ userId: params.userId }, params);
  }

  deleteUserById(userId: string): Promise<DeleteResult> {
    return this.userRepository.delete({ userId });
  }
}