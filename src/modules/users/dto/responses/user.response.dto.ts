import { User } from "../../entities/user.entity";
import { Expose, plainToInstance, Type } from "class-transformer";
import { RoleResponseDto } from "../../../database/dto/responses/role.response-dto";

export class UserResponseDto {
  @Expose()
  id!: string;

  @Expose()
  firstName!: string;
  
  @Expose()
  lastName!: string;

  @Expose()
  middleName!: string;

  @Expose()
  @Type(() => RoleResponseDto)
  role!: RoleResponseDto;

  @Expose()
  positionName!: string;

  constructor(entity: Partial<User>) {
    return plainToInstance(UserResponseDto, entity, { excludeExtraneousValues: true });
  }
}