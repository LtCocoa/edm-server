import { IsEnum, IsString, MaxLength, MinLength } from "class-validator";
import { DocumentType } from "../../entities/document_types";
import { type UUID } from "crypto";
import { Expose, plainToInstance, Type } from "class-transformer";

class UserDto {
  @Expose()
  userId!: UUID;

  @Expose()
  name!: string;
}

export class DocumentResponseDto {
  @Expose()
  documentId!: String;

  @Expose()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  title!: string;

  @Expose()
  @IsEnum(DocumentType)
  type!: DocumentType;

  @Expose()
  @Type(() => UserDto)
  user!: UserDto;

  constructor(partial: Partial<Document>) {
    return plainToInstance(DocumentResponseDto, partial, { excludeExtraneousValues: true });
  }
}