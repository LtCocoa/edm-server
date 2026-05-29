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
  Res,
} from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { CreateDocumentRequestDto } from './dto/requests/create-document.request-dto';
import { UpdateDocumentRequestDto } from './dto/requests/update-document.request-dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DocumentResponseDto } from './dto/responses/document.response-dto';
import { RoleGuard } from '../../shared/guards/role.guard';
import { RequireRole } from '../../shared/decorators/role.decorator';
import { type Response } from 'express';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createDocumentDto: CreateDocumentRequestDto, @Req() request) {
    const { id } = request.user;
    return this.documentsService.create(id, createDocumentDto);
  }

  @Get()
  async findAll() {
    const documents = await this.documentsService.findAll();
    return documents.map(document => new DocumentResponseDto(document));
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const document = await this.documentsService.findDocumentById(id);
    if (!document) {
      throw new NotFoundException(`Could not find a document with id ${id}`);
    }
    return new DocumentResponseDto(document);
  }

  @Patch(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateDocumentDto: UpdateDocumentRequestDto) {
    const updatedDocument = await this.documentsService.update(id, updateDocumentDto);
    if (!updatedDocument) {
      throw new NotFoundException(`Could not update a document with id ${id}`);
    }

    return updatedDocument;
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.documentsService.remove(id);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @RequireRole('manager')
  @Post(':id/approve')
  approve(@Param('id', ParseUUIDPipe) id: string, @Req() request) {
    const { id: userId } = request.user;
    return this.documentsService.approve(id, userId);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @RequireRole('manager')
  @Post(':id/reject')
  reject(@Param('id', ParseUUIDPipe) id: string, @Req() request) {
    const { id: userId } = request.user;
    return this.documentsService.reject(id, userId);
  }

  // @UseGuards(JwtAuthGuard)
  @Get(':id/export')
  async export(@Param('id') id: string, @Res() res: Response) {
    const buffer = await this.documentsService.generate(id);

    if (!buffer) {
      throw new NotFoundException(`Could not find document with id ${id}`);
    }

    res.set({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'Conent-Disposition': 'attachment; filename=document.docx',
    });

    res.send(buffer);
  }
}
