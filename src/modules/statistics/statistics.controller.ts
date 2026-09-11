import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { DocumentsByMonthRequestDto } from './dto/requests/get-documents-by-month.request.dto';
import { DocumentsByYearRequestDto } from './dto/requests/get-documents-by-year.request.dto';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('reviewers')
  getReviewers() {
    return this.statisticsService.getReviewers();
  }

  @Post('documents-by-month')
  @HttpCode(200)
  getDocumentsByMonth(@Body() documentsByMonthDto: DocumentsByMonthRequestDto) {
    const { startDate: startDateString, endDate: endDateString } = documentsByMonthDto;
    
    return this.statisticsService.getDocumentsCreatedByMonth(startDateString, endDateString);
  }

  @Post('yearly-documents-by-month')
  @HttpCode(200)
  getDocumentsByYear(@Body() documentsByYearDto: DocumentsByYearRequestDto) {
    return this.statisticsService.getYearlyDocumentsCreatedByMonth(documentsByYearDto.year);
  }
}
