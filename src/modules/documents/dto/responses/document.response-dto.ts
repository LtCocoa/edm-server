import { IsEnum, IsString, MaxLength, MinLength } from "class-validator";
import { type UUID } from "crypto";
import { Expose, plainToInstance, Type } from "class-transformer";
import { DocumentType } from "../../enums/document-type.enum";

class AuthorDto {
  @Expose()
  id!: UUID;

  @Expose()
  firstName!: string;

  @Expose()
  lastName!: string;

  @Expose()
  middleName!: string;
}

class ReviewerDto {
  @Expose()
  id!: UUID;

  @Expose()
  firstName!: string;

  @Expose()
  lastName!: string;

  @Expose()
  middleName!: string;
}

class StatusDto {
  @Expose()
  id!: number;

  @Expose()
  key!: string;

  @Expose()
  name!: string;
}

export class DocumentResponseDto {
  @Expose()
  id!: String;

  @Expose()
  title!: string;

  @Expose()
  type!: DocumentType;

  @Expose()
  @Type(() => AuthorDto)
  author!: AuthorDto;

  @Expose()
  startDate!: Date;

  @Expose()
  endDate!: Date;

  @Expose()
  @Type(() => StatusDto)
  status!: StatusDto;
  
  @Expose()
  @Type(() => ReviewerDto)
  reviewer!: ReviewerDto;

  @Expose()
  reviewedAt!: Date;

  @Expose()
  comment!: string;

  constructor(partial: Partial<Document>) {
    return plainToInstance(DocumentResponseDto, partial, { excludeExtraneousValues: true });
  }
}