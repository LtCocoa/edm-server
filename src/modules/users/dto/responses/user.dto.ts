import { User } from "../../entities/user.entity";
import { Expose, plainToInstance } from "class-transformer";
import { IsString } from "class-validator";

export class UserResponseDto {
  @Expose()
  @IsString()
  userId!: string;

  @Expose()
  @IsString()
  login!: string;

  @Expose()
  @IsString()
  name!: string;

  constructor(entity: Partial<User>) {
    return plainToInstance(UserResponseDto, entity, { excludeExtraneousValues: true });
  }
}