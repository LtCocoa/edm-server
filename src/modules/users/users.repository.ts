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

  async findAllUsers(): Promise<User[]> {
    try {
      return this.userRepository.find();
    } catch (error) {
      console.error(error);
    }
    return [];
  }

  async findUserByLogin(login: string): Promise<User | null> {
    try {
      const user = await this.userRepository.findOneBy({ login });
      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async findUserById(userId: string): Promise<User | null> {
    try {
      const user = await this.userRepository.findOneBy({ userId });
      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async updateUserById(params: DeepPartial<User>) {
    const { userId } = params;
    try {
      const { affected } = await this.userRepository.update({ userId }, params);
      if (!!affected) {
        const updatedUser = await this.userRepository.findOneBy({ userId });
        return updatedUser;
      }
    } catch (error) {
      console.error(error);
    }
    return null;
  }

  async deleteUserById(userId: string): Promise<boolean> {
    try {
      const { affected } = await this.userRepository.delete({ userId });
      if (!!affected) {
        return true;
      }
    } catch (error) {
      console.error(error);
    }
    return false;
  }
}