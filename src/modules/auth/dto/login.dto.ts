import { Expose } from "@nestjs/class-transformer";
import { IsString, MaxLength, MinLength } from "class-validator";

export class LoginDto { 
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
}
