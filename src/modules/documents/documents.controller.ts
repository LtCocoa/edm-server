import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  NotFoundException,
  ParseUUIDPipe,
} from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { CreateDocumentRequestDto } from './dto/requests/create-document.dto';
import { UpdateDocumentRequestDto } from './dto/requests/update-document.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DocumentResponseDto } from './dto/responses/document.dto';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createDocumentDto: CreateDocumentRequestDto, @Req() request) {
    return this.documentsService.create({
      ...createDocumentDto,
      user: request.user
    });
  }

  @Get()
  async findAll() {
    const documents = await this.documentsService.findAll();
    return documents.map(document => new DocumentResponseDto(document));
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const document = await this.documentsService.findOne(id);
    if (!document) {
      throw new NotFoundException(`Could not find a document with id ${id}`);
    }
    return new DocumentResponseDto(document);
  }

  @Patch(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateDocumentDto: UpdateDocumentRequestDto) {
    const updatedDocument = await this.documentsService.update({ documentId: id, ...updateDocumentDto });
    if (!updatedDocument) {
      throw new NotFoundException(`Could not update a document with id ${id}`);
    }

    return updatedDocument;
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.documentsService.remove(id);
  }
}
