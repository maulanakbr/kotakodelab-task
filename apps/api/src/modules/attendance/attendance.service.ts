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
    const findAttendance = await this.findByStaffId(user.id);

    console.log('findAttendance', findAttendance);

    if (findAttendance !== null) AttendanceAlreadyFulfilledError();

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
    attendanceId: string,
  ): Promise<Attendance> {
    const attendance = await this.attendanceRepository.findOne({
      where: { id: attendanceId },
    });
    if (!attendance) NoAttendanceRecordFoundError();
    if (attendance.updatedAt) AttendanceAlreadyFulfilledError();
    if (
      options.latitude !== attendance.latitude ||
      options.longitude !== attendance.longitude
    )
      LocationNotMatchError();

    const findStaff = this.staffService.findOne({ id: user.id });
    if (!findStaff) NoStaffFoundError();

    attendance.clockOut = options.clockOut;

    await attendance.save();
    return attendance;
  }

  async findByStaffId(staffId: string): Promise<Attendance> {
    const attendance = await this.attendanceRepository.findOne({
      where: { staffId, createdAt: String(new Date()) },
    });

    return attendance;
  }
}
