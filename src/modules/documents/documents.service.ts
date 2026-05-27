import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDocumentRequestDto } from './dto/requests/create-document.request-dto';
import { UpdateDocumentRequestDto } from './dto/requests/update-document.request-dto';
import { DocumentsRepository } from './documents.repository';
import { UsersService } from '../users/users.service';
import { Status } from '../database/entities/status.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

interface ChangeStatusMessages {
  operation: string;
}

@Injectable()
export class DocumentsService {
  constructor(
    private readonly documentsRepository: DocumentsRepository,
    private readonly usersService: UsersService,
    @InjectRepository(Status)
    private readonly statusesRepository: Repository<Status>
  ) {}

  async create(userId: string, createDocumentDto: CreateDocumentRequestDto) {
    const user = await this.usersService.findOneById(userId);
    if (!user) {
      throw new HttpException('User not found.', HttpStatus.FAILED_DEPENDENCY);
    }
    return this.documentsRepository.createDocument({
      author: {
        id: userId
      },
      ...createDocumentDto
    });
  }

  findAll() {
    return this.documentsRepository.findAllDocuments();
  }

  findDocumentById(id: string) {
    return this.documentsRepository.findOneById(id);
  }

  update(id: string, updateDocumentDto: UpdateDocumentRequestDto) {
    return this.documentsRepository.update(id, updateDocumentDto);
  }

  remove(id: string) {
    return this.documentsRepository.delete(id);
  }

  approve(documentId: string, userId: string) {
    return this.changeStatus(documentId, userId, 'approved', {
      operation: 'approve'
    });
  }

  reject(documentId: string, userId: string) {
    return this.changeStatus(documentId, userId, 'rejected', {
      operation: 'reject'
    });
  }

  private async changeStatus(
    documentId: string,
    userId: string,
    statusKey: 'approved' | 'rejected',
    messages: ChangeStatusMessages
  ) {
    const document = await this.documentsRepository.findOneById(documentId);
    if (!document) {
      throw new NotFoundException(`Could not ${messages.operation} document with id ${documentId} - document does not exist`);
    }

    if (document.reviewedBy != null) {
      throw new ConflictException(`Could not ${messages.operation} documenth with id ${documentId} - document is already reviewed`);
    }

    const user = await this.usersService.findOneById(userId);
    if (!user) {
      throw new NotFoundException(`Could not ${messages.operation} document with id ${documentId} - reviewing user does not exit`);
    }

    const status = await this.statusesRepository.findOneBy({ key: statusKey });
    if (!status) {
      throw new NotFoundException(`Could not ${messages.operation} document with id ${documentId} - ${messages.operation} status does not exit`)
    }

    document.reviewedBy = user;
    document.status = status;

    return this.documentsRepository.update(documentId, document);
  }
}
