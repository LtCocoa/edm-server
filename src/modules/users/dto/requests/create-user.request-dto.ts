import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserRequestDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  login!: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password!: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  firstName!: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  lastName!: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  middleName!: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  positionName!: string;

  @IsNumber()
  roleId!: number;
}
