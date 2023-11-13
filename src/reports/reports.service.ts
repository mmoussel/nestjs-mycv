import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from '../users/user.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private reportsRepo: Repository<Report>,
  ) {}

  create(reportDto: CreateReportDto, user: User) {
    const report = this.reportsRepo.create(reportDto);

    report.user = user;

    return this.reportsRepo.save(report);
  }

  find() {
    return this.reportsRepo.find();
  }

  async changeApproval(id: string, approved: boolean) {
    const report = await this.reportsRepo.findOne({
      where: { id: parseInt(id) },
    });

    if (!report) {
      throw new Error('report not found');
    }

    report.approved = approved;

    return this.reportsRepo.save(report);
  }
}
