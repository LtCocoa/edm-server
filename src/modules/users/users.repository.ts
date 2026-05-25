import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { DeepPartial, Repository } from "typeorm";
import { BadRequestException } from "@nestjs/common";

export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  async createUser<T extends DeepPartial<User>>(entity: T): Promise<User | null> {
    try {
      const savedUser = await this.usersRepository.save(entity);
      return savedUser;
    } catch (error: unknown) {
      throw new BadRequestException((error as Error).message);
    }
  }

  async findAllUsers(): Promise<User[]> {
    try {
      return this.usersRepository.find({ relations: {
        documents: true,
        role: true,
      }});
    } catch (error) {
      console.error(error);
    }
    return [];
  }

  async findUserByLogin(login: string): Promise<User | null> {
    try {
      const user = await this.usersRepository.findOne({ 
        where: { login },
        relations: {
          documents: true,
          role: true,
        }
      });
      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async findUserById(userId: string): Promise<User | null> {
    try {
      const user = await this.usersRepository.findOne({ 
        where: { userId },
        relations: {
          documents: true,
          role: true,
        }
      });
      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async updateUserById(params: DeepPartial<User>) {
    const { userId } = params;
    try {
      const { affected } = await this.usersRepository.update({ userId }, params);
      if (!!affected) {
        const updatedUser = await this.usersRepository.findOne({ 
        where: { userId },
        relations: {
          documents: true,
          role: true,
        }
      });
        return updatedUser;
      }
    } catch (error) {
      console.error(error);
    }
    return null;
  }

  async deleteUserById(userId: string): Promise<boolean> {
    try {
      const { affected } = await this.usersRepository.delete({ userId });
      if (!!affected) {
        return true;
      }
    } catch (error) {
      console.error(error);
    }
    return false;
  }
}