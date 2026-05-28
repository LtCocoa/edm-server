import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDocumentRequestDto } from './dto/requests/create-document.request-dto';
import { UpdateDocumentRequestDto } from './dto/requests/update-document.request-dto';
import { DocumentsRepository } from './documents.repository';
import { UsersService } from '../users/users.service';
import { Status } from '../database/entities/status.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DocumentsGateway } from './documents.gateway';

interface ChangeStatusMessages {
  operation: string;
}

@Injectable()
export class DocumentsService {
  constructor(
    private readonly documentsRepository: DocumentsRepository,
    private readonly usersService: UsersService,
    private readonly documentsGateway: DocumentsGateway,
    @InjectRepository(Status)
    private readonly statusesRepository: Repository<Status>
  ) {}

  async create(userId: string, createDocumentDto: CreateDocumentRequestDto) {
    const user = await this.usersService.findOneById(userId);
    if (!user) {
      throw new HttpException('User not found.', HttpStatus.FAILED_DEPENDENCY);
    }

    try {
      const document = await this.documentsRepository.createDocument({
        author: {
          id: userId
        },
        ...createDocumentDto
      });

      if (!document) {
        throw new ConflictException('Could not create document');
      }
      
      this.documentsGateway.emitPendingDocument(document);
      
      return document;
    } catch (err) {
      throw err;
    }
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
    const baseExceptionMessage = `Could not ${messages.operation} document with id ${documentId}`;
    const document = await this.documentsRepository.findOneById(documentId);
    if (!document) {
      throw new NotFoundException(`${baseExceptionMessage}: document does not exist`);
    }

    if (document.reviewedBy != null) {
      throw new ConflictException(`${baseExceptionMessage}: document is already reviewed`);
    }

    const user = await this.usersService.findOneById(userId);
    if (!user) {
      throw new NotFoundException(`${baseExceptionMessage}: reviewing user does not exit`);
    }

    const status = await this.statusesRepository.findOneBy({ key: statusKey });
    if (!status) {
      throw new NotFoundException(`${baseExceptionMessage}: ${messages.operation} status does not exit`)
    }

    document.reviewedBy = user;
    document.status = status;

    const updatedDocument = await this.documentsRepository.update(documentId, document);

    if (!updatedDocument) {
      throw new ConflictException(`${baseExceptionMessage}`);
    }

    this.documentsGateway.emitStatusChange(document, statusKey);

    return updatedDocument;
  }
}
