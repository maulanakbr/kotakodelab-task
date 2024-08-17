import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import {
  AttendanceClockInDto,
  AttendanceClockOutDto,
} from './dto/attendance.dto';
import { CurrentUser } from 'src/decorators/user.decorator';
import { IStaff } from '../staff/entities/staff.entity';
import { JwtAuthGuard } from '../auth/guard/auth.guard';
import { Role } from 'src/decorators/role.decorator';
import { AuthEntityTypeEnum } from 'src/types/enums';
import { RoleGuard } from '../auth/guard/role.guard';

@Controller({ version: '1', path: 'attendance' })
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  @Role(AuthEntityTypeEnum.STAFF)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async clockIn(
    @CurrentUser() user: IStaff,
    @Body() options: AttendanceClockInDto,
  ) {
    const attendance = await this.attendanceService.clockIn(options, user);
    return { data: attendance };
  }

  @Put(':attendanceId')
  @Role(AuthEntityTypeEnum.STAFF)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async clockOut(
    @Param('attendanceId') attendanceId: string,
    @CurrentUser() user: IStaff,
    @Body() options: AttendanceClockOutDto,
  ) {
    const attendance = await this.attendanceService.clockOut(
      options,
      user,
      attendanceId,
    );
    return { data: attendance };
  }

  @Get(':staffId')
  @Role(AuthEntityTypeEnum.STAFF)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async findByStaffId(@Param('staffId') staffId: string) {
    const attendance = await this.attendanceService.findByStaffId(staffId);
    return { data: attendance };
  }
}
