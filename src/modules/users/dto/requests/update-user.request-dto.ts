import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.request-dto';

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['login'])
) {}
