import { IsNotEmpty, IsString } from 'class-validator';

class BaseAttendanceDto {
  @IsNotEmpty()
  @IsString()
  readonly latitude: string;

  @IsNotEmpty()
  @IsString()
  readonly longitude: string;
}

export class AttendanceClockInDto extends BaseAttendanceDto {
  @IsNotEmpty()
  @IsString()
  readonly clockIn: string;
}

export class AttendanceClockOutDto extends BaseAttendanceDto {
  @IsNotEmpty()
  @IsString()
  readonly clockOut: string;
}
