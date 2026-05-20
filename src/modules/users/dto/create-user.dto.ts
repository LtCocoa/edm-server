import { Expose } from "@nestjs/class-transformer";
import { IsString } from "class-validator";

export class CreateUserDto { 
  @Expose()
  @IsString()
  login!: string;

  @Expose()
  @IsString()
  password!: string;

  @Expose()
  @IsString()
  name!: string;
}
