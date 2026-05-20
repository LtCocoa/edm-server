import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './users.repository';
import { DatabaseModule } from '../database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [
    // DatabaseModule,
    TypeOrmModule.forFeature([User]),
  ],
  providers: [UsersService, UserRepository],
  controllers: [UsersController],
})
export class UsersModule {}
