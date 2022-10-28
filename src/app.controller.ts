import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { data, ReportType } from './data';

@Controller('report/:type')
export class AppController {
  @Get()
  getAllReports(@Param('type') type: string) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return data.reports.filter((report) => report.type === reportType);
  }

  @Get(':id')
  getReportById(@Param('type') type: string, @Param('id') id: string) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    return data.reports.find(
      (report) => report.type === reportType && report.id === id,
    );
  }

  @Post()
  createReport(
    @Body() { source, amount }: { source: string; amount: number },
    @Param('type') type: string,
  ) {
    const newReport = {
      id: uuid(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type: type === 'income' ? ReportType.INCOME : ReportType.EXPENSE,
    };

    data.reports.push(newReport);
    return newReport;
  }

  @Put(':id')
  updateReport(
    @Body() body: { source: string; amount: number },
    @Param('type') type: string,
    @Param('id') id: string,
  ) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    const reportToUpdateIdx = data.reports.findIndex(
      (r) => r.type === reportType && r.id === id,
    );

    if (reportToUpdateIdx < 0) return;

    data.reports[reportToUpdateIdx] = {
      ...data.reports[reportToUpdateIdx],
      ...body,
    };

    return data.reports[reportToUpdateIdx];
  }

  @Delete(':id')
  @HttpCode(204)
  deleteReport(@Param('type') type: string, @Param('id') id: string) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    const reportToDelete = data.reports.find(
      (r) => r.type === reportType && r.id === id,
    );

    if (!reportToDelete) return;

    data.reports = data.reports.filter(
      (r) => r.type === reportType && r.id !== id,
    );

    return reportToDelete;
  }
}
