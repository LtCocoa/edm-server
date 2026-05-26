import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from './entities/document.entity';
import { DocumentsRepository } from './documents.repository';
import { UsersModule } from '../users/users.module';
import { Status } from '../database/entities/status.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Document, Status]),
    UsersModule,
  ],
  controllers: [DocumentsController],
  providers: [DocumentsService, DocumentsRepository],
})
export class DocumentsModule {}
