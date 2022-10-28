import { IsPositive, IsString, IsNotEmpty } from 'class-validator';

export class CreateReportDto {
  @IsString()
  @IsNotEmpty()
  source: string;

  @IsPositive()
  amount: number;
}
