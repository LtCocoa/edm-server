import { InjectRepository } from "@nestjs/typeorm";
import { Document } from "./entities/document.entity";
import { DeepPartial, Repository } from "typeorm";
import { UpdateDocumentRequestDto } from "./dto/requests/update-document.request-dto";
import { Status } from "../database/entities/status.entity";
import { InternalServerErrorException } from "@nestjs/common";

export class DocumentsRepository {
  constructor(
    @InjectRepository(Document)
    private readonly documentsRepository: Repository<Document>,
    @InjectRepository(Status)
    private readonly statusesRepository: Repository<Status>,
  ) {}

  async createDocument<T extends DeepPartial<Document>>(entity: T): Promise<Document | null> {
    try {
      const createdStatus = await this.statusesRepository.findOneBy({ key: 'pending' });
      if (!createdStatus) {
        throw new InternalServerErrorException('Could not find status row in database');
      }

      const savedDocument = await this.documentsRepository.save({
        status: {
          id: createdStatus.id,
        },
        ...entity
      });
      return savedDocument;
    } catch (err) {
      console.log((err as Error).message);
      throw err;
    }
  }

  async findAllDocuments() {
    return this.documentsRepository.find({ relations: {
      author: true,
      reviewer: true,
      status: true,
    } });
  }

  async findOneById(id: string) {
    const documents = await this.documentsRepository.find({
      relations: {
        author: true,
        reviewer: true,
        status: true,
      },
      where: {
        id
      },
      take: 1
    });
    if (documents.length) {
      return documents[0];
    }
    return null;
  }

  async update(id: string, params: UpdateDocumentRequestDto) {
    try {
      const { affected } = await this.documentsRepository.update({ id }, params);
      if (!affected) {
        return null;
      }
      const updatedDocument = await this.documentsRepository.findOneBy({ id });
      return updatedDocument;
    } catch (err) {
      return null;
    }
  }

  async delete(id: string) {
    return this.documentsRepository.delete({ id });
  }
}