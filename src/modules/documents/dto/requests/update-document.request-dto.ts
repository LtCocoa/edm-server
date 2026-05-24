import { PartialType } from '@nestjs/mapped-types';
import { CreateDocumentRequestDto } from './create-document.request-dto';
import { PickType } from '@nestjs/mapped-types';

export class UpdateDocumentRequestDto extends PartialType(
  PickType(CreateDocumentRequestDto, ['title', 'type'])
) {}
