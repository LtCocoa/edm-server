import { Expose } from "class-transformer";
import { IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto { 
  @Expose()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  login!: string;

  @Expose()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password!: string;

  @Expose()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  name!: string;
}
