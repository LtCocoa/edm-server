import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDocumentRequestDto } from './dto/requests/create-document.request-dto';
import { UpdateDocumentRequestDto } from './dto/requests/update-document.request-dto';
import { DocumentsRepository } from './documents.repository';
import { UsersService } from '../users/users.service';
import { Document } from './entities/document.entity';

@Injectable()
export class DocumentsService {
  constructor(
    private readonly documentsRepository: DocumentsRepository,
    private readonly usersService: UsersService,
  ) {}

  async create(userId: string, createDocumentDto: CreateDocumentRequestDto) {
    const user = await this.usersService.findOneById(userId);
    if (!user) {
      throw new HttpException('User not found.', HttpStatus.FAILED_DEPENDENCY);
    }
    return this.documentsRepository.createDocument({
      user: {
        userId
      },
      ...createDocumentDto
    });
  }

  findAll() {
    return this.documentsRepository.findAllDocuments();
  }

  async findOne(id: string) {
    const documents = await this.documentsRepository.findById(id);
    if (documents.length) {
      return documents[0];
    }
    return null;
  }

  update(documentId: string, updateDocumentDto: UpdateDocumentRequestDto) {
    return this.documentsRepository.update(documentId, updateDocumentDto);
  }

  remove(id: string) {
    return this.documentsRepository.delete(id);
  }
}
