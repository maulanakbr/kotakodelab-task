import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { StaffService } from '../staff/staff.service';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService, StaffService],
  imports: [TypeOrmModule.forFeature([Company])],
})
export class CompanyModule {}
