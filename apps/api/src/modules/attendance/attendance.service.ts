import { Injectable } from '@nestjs/common';
import { Attendance } from './entities/attendance.entity';
import {
  AttendanceClockInDto,
  AttendanceClockOutDto,
} from './dto/attendance.dto';
import {
  AttendanceAlreadyFulfilledError,
  LocationNotMatchError,
  NoAttendanceRecordFoundError,
  NoStaffFoundError,
} from 'src/errors/ResourceError';
import { StaffService } from '../staff/staff.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyService } from '../company/company.service';
import type { IStaff } from '../staff/entities/staff.entity';
import { compareLocation } from 'src/helpers/compare-loc';
import { Between } from 'typeorm';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceRepository: Repository<Attendance>,
    private readonly staffService: StaffService,
    private readonly companyService: CompanyService,
  ) {}

  async clockIn(
    options: AttendanceClockInDto,
    user: IStaff,
  ): Promise<Attendance> {
    const existingAttendance = await this.findByStaffId(user.id);
    if (existingAttendance) AttendanceAlreadyFulfilledError();

    const findCompany = await this.companyService.findOne(user.companyId);
    const compareResult = compareLocation({
      reqLatitude: options.latitude,
      reqLongitude: options.longitude,
      targetLatitude: findCompany.latitude,
      targetLongitude: findCompany.longitude,
    });
    if (!compareResult) LocationNotMatchError();

    const findStaff = this.staffService.findOne({ id: user.id });
    if (!findStaff) NoStaffFoundError();

    const attendance = new Attendance();
    Object.keys(options).forEach((key) => {
      if (user) {
        attendance.staffId = user.id;
      }
      attendance[key] = options[key];
    });

    await attendance.save();
    return attendance;
  }

  async clockOut(
    options: AttendanceClockOutDto,
    user: IStaff,
  ): Promise<Attendance> {
    const existingAttendance = await this.findByStaffId(user.id);
    if (!existingAttendance) NoAttendanceRecordFoundError();
    if (existingAttendance.updatedAt) AttendanceAlreadyFulfilledError();

    const findCompany = await this.companyService.findOne(user.companyId);
    const compareResult = compareLocation({
      reqLatitude: options.latitude,
      reqLongitude: options.longitude,
      targetLatitude: findCompany.latitude,
      targetLongitude: findCompany.longitude,
    });
    if (!compareResult) LocationNotMatchError();

    const findStaff = this.staffService.findOne({ id: user.id });
    if (!findStaff) NoStaffFoundError();

    existingAttendance.clockOut = options.clockOut;

    await existingAttendance.save();
    return existingAttendance;
  }

  async findByStaffId(staffId: string): Promise<Attendance> {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const attendance = await this.attendanceRepository.findOne({
      where: { staffId, createdAt: Between(startOfDay, endOfDay) },
    });

    return attendance;
  }
}
