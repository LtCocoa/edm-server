import { IsDateString } from "class-validator";

export class DocumentsByMonthRequestDto {
  @IsDateString()
  startDate!: string;

  @IsDateString()
  endDate!: string;
}