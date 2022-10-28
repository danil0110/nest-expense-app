import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseEnumPipe,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';

import { ReportType } from './data';
import { CreateReportDto, UpdateReportDto } from './dtos/report.dto';

@Controller('report/:type')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllReports(
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
  ) {
    return this.appService.getAllReports(type);
  }

  @Get(':id')
  getReportById(
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.appService.getReportById(type, id);
  }

  @Post()
  createReport(
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
    @Body() body: CreateReportDto,
  ) {
    return this.appService.createReport(type, body);
  }

  @Put(':id')
  updateReport(
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
    @Param('id') id: string,
    @Body() body: UpdateReportDto,
  ) {
    return this.appService.updateReport(type, id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteReport(
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
    @Param('id') id: string,
  ) {
    return this.appService.deleteReport(type, id);
  }
}
