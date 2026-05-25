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
  name!: string;

  @IsNumber()
  roleId!: number;
}
