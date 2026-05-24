import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDocumentRequestDto } from './dto/requests/create-document.dto';
import { UpdateDocumentRequestDto } from './dto/requests/update-document.dto';
import { DocumentsRepository } from './documents.repository';
import { UsersService } from '../users/users.service';

@Injectable()
export class DocumentsService {
  constructor(
    private readonly documentsRepository: DocumentsRepository,
    private readonly usersService: UsersService,
  ) {}

  async create(createDocumentDto: CreateDocumentRequestDto) {
    const user = await this.usersService.findOneById(createDocumentDto.user.userId);
    if (!user) {
      throw new HttpException('User not found.', HttpStatus.FAILED_DEPENDENCY);
    }
    return this.documentsRepository.createDocument(createDocumentDto);
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

  update(updateDocumentDto: UpdateDocumentRequestDto) {
    return this.documentsRepository.update(updateDocumentDto);
  }

  remove(id: string) {
    return this.documentsRepository.delete(id);
  }
}
