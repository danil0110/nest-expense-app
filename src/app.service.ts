import { Injectable } from '@nestjs/common';
import { ReportType, data } from './data';
import { v4 as uuid } from 'uuid';

interface Report {
  source: string;
  amount: number;
}

@Injectable()
export class AppService {
  getAllReports(type: ReportType) {
    return data.reports.filter((report) => report.type === type);
  }

  getReportById(type: ReportType, id: string) {
    return data.reports.find(
      (report) => report.type === type && report.id === id,
    );
  }

  createReport(type: ReportType, { source, amount }: Report) {
    const newReport = {
      id: uuid(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type,
    };

    data.reports.push(newReport);
    return newReport;
  }

  updateReport(type: ReportType, id: string, body: Report) {
    const reportToUpdateIdx = data.reports.findIndex(
      (r) => r.type === type && r.id === id,
    );

    if (reportToUpdateIdx < 0) return;

    data.reports[reportToUpdateIdx] = {
      ...data.reports[reportToUpdateIdx],
      ...body,
    };

    return data.reports[reportToUpdateIdx];
  }

  deleteReport(type: ReportType, id: string) {
    const reportToDelete = data.reports.find(
      (r) => r.type === type && r.id === id,
    );

    if (!reportToDelete) return;

    data.reports = data.reports.filter((r) => r.type === type && r.id !== id);

    return reportToDelete;
  }
}
