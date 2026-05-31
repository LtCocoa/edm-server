import { IsEnum, IsString, IsUUID, MaxLength, MinLength, ValidateNested } from "class-validator";
import { DocumentType } from "../../entities/document_types";
import { Type } from "class-transformer";

class ReviewerDto {
  @IsUUID()
  id!: string;
}

export class CreateDocumentRequestDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  title!: string;

  @IsEnum(DocumentType)
  type!: DocumentType;

  @ValidateNested()
  @Type(() => ReviewerDto)
  reviewer!: ReviewerDto;
}
