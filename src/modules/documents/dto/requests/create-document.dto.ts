import { IsEnum, IsString, IsUUID, MaxLength, MinLength } from "class-validator";
import { DocumentType } from "../../entities/document_types";
import { UUID } from "crypto";

class UserDto {
  userId!: UUID
}

export class CreateDocumentRequestDto {
  @IsUUID()
  documentId!: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  title!: string;

  @IsEnum(DocumentType)
  type!: DocumentType;

  user!: UserDto;
}
