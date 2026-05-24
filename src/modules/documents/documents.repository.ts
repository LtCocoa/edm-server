import { InjectRepository } from "@nestjs/typeorm";
import { Document } from "./entities/document.entity";
import { DeepPartial, Repository } from "typeorm";
import { UpdateDocumentRequestDto } from "./dto/requests/update-document.dto";

export class DocumentsRepository {
  constructor(
    @InjectRepository(Document)
    private readonly documentsRepository: Repository<Document>
  ) {}

  async createDocument<T extends DeepPartial<Document>>(entity: T): Promise<Document | null> {
    try {
      const savedDocument = await this.documentsRepository.save(entity);
      return savedDocument;
    } catch (err) {
      console.log((err as Error).message);
    }

    return null;
  }

  async findAllDocuments() {
    return this.documentsRepository.find({ relations: {
      user: true
    } });
  }

  async findById(id: string) {
    return this.documentsRepository.find({
      relations: {
        user: true
      },
      where: {
        documentId: id
      },
      take: 1
    });
  }

  async update(params: UpdateDocumentRequestDto) {
    const { documentId } = params;
    try {
      const { affected } = await this.documentsRepository.update({ documentId }, params);
      if (!affected) {
        return null;
      }
      const updatedDocument = await this.documentsRepository.findOneBy({ documentId });
      return updatedDocument;
    } catch (err) {
      return null;
    }
  }

  async delete(id: string) {
    return this.documentsRepository.delete({ documentId: id });
  }
}