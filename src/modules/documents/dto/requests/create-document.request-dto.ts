import { IsEnum, IsString, IsUUID, MaxLength, MinLength, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { DocumentType } from "../../enums/document-type.enum";

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
