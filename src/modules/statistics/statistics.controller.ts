import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { DocumentsByMonthRequestDto } from './dto/requests/get-monthly-documents.request.dto';

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
    
    return this.statisticsService.getDocumentsByMonth(startDateString, endDateString);
  }
}
