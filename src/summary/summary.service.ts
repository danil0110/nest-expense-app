import { Injectable } from '@nestjs/common';
import { ReportType } from 'src/data';
import { ReportService } from 'src/report/report.service';

@Injectable()
export class SummaryService {
  constructor(private readonly reportService: ReportService) {}

  getSummary() {
    const incomes = this.reportService.getAllReports(ReportType.INCOME);
    const expenses = this.reportService.getAllReports(ReportType.EXPENSE);

    const totalIncome = incomes.reduce((total, curr) => total + curr.amount, 0);
    const totalExpense = expenses.reduce(
      (total, curr) => total + curr.amount,
      0,
    );
    const netIncome = totalIncome - totalExpense;

    return { totalIncome, totalExpense, netIncome };
  }
}
