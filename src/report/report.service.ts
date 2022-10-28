import { Injectable } from '@nestjs/common';
import { ReportType, data } from '../data';
import { v4 as uuid } from 'uuid';
import { ReportResponseDto } from '../dtos/report.dto';

interface Report {
  source: string;
  amount: number;
}

@Injectable()
export class ReportService {
  getAllReports(type: ReportType): ReportResponseDto[] {
    return data.reports
      .filter((report) => report.type === type)
      .map((report) => new ReportResponseDto(report));
  }

  getReportById(type: ReportType, id: string): ReportResponseDto {
    const report = data.reports.find(
      (report) => report.type === type && report.id === id,
    );

    if (!report) return;

    return new ReportResponseDto(report);
  }

  createReport(
    type: ReportType,
    { source, amount }: Report,
  ): ReportResponseDto {
    const newReport = {
      id: uuid(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type,
    };

    data.reports.push(newReport);
    return new ReportResponseDto(newReport);
  }

  updateReport(type: ReportType, id: string, body: Report): ReportResponseDto {
    const reportToUpdateIdx = data.reports.findIndex(
      (r) => r.type === type && r.id === id,
    );

    if (reportToUpdateIdx < 0) return;

    data.reports[reportToUpdateIdx] = {
      ...data.reports[reportToUpdateIdx],
      ...body,
    };

    return new ReportResponseDto(data.reports[reportToUpdateIdx]);
  }

  deleteReport(type: ReportType, id: string): ReportResponseDto {
    const reportToDelete = data.reports.find(
      (r) => r.type === type && r.id === id,
    );

    if (!reportToDelete) return;

    data.reports = data.reports.filter((r) => r.type === type && r.id !== id);

    return new ReportResponseDto(reportToDelete);
  }
}
