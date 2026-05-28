import { User } from "../../entities/user.entity";
import { Expose, plainToInstance, Type } from "class-transformer";
import { IsString } from "class-validator";
import { RoleResponseDto } from "../../../database/dto/responses/role.response-dto";

export class UserResponseDto {
  @Expose()
  @IsString()
  id!: string;

  @Expose()
  @IsString()
  name!: string;

  @Expose()
  @Type(() => RoleResponseDto)
  role!: RoleResponseDto;

  constructor(entity: Partial<User>) {
    return plainToInstance(UserResponseDto, entity, { excludeExtraneousValues: true });
  }
}