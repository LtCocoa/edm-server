import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
  BadRequestException
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserRequestDto } from './dto/requests/update-user.request-dto';
import { UserResponseDto } from './dto/responses/user.response.dto';
import { CreateUserRequestDto } from './dto/requests/create-user.request-dto';
import { RoleGuard } from '../../shared/guards/role.guard';
import { Role } from '../../shared/decorators/role.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Role('admin')
  @Post()
  async createUser(@Body() createUserDto: CreateUserRequestDto) {
    const newUser = await this.usersService.create(createUserDto);
    if (!newUser) {
      throw new BadRequestException('Could not create user');
    }
    return new UserResponseDto(newUser);
  }

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();

    return users.map(user => new UserResponseDto(user));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOneById(id);
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    return new UserResponseDto(user);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserRequestDto) {
    const user = await this.usersService.update(id, updateUserDto);
    if (user) {
      return new UserResponseDto(user);
    }
    throw new NotFoundException('User not found.');
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
