import { IsDate, IsEnum, IsString, IsUUID, MaxLength, MinLength, ValidateIf, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { DocumentType } from "../../enums/document-type.enum";
import { Document } from "../../entities/document.entity";

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

  @Type(() => Date)
  @IsDate()
  startDate!: Date;

  @ValidateIf((o: Document) => o.type === DocumentType.VACATION)
  @Type(() => Date)
  @IsDate()
  endDate!: Date;
}
