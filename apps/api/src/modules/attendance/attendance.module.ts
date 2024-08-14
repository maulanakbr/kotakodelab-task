import { Module } from '@nestjs/common';
import { AttendanceController } from './attendance.controller';
import { AttendanceService } from './attendance.service';
import { StaffService } from '../staff/staff.service';
import { Attendance } from './entities/attendance.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyService } from '../company/company.service';
import { Company } from '../company/entities/company.entity';

@Module({
  controllers: [AttendanceController],
  providers: [AttendanceService, StaffService, CompanyService],
  imports: [TypeOrmModule.forFeature([Attendance, Company])],
})
export class AttendanceModule {}
