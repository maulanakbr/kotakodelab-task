import { Test, TestingModule } from '@nestjs/testing';
import { AttendanceService } from './attendance.service';
import { Attendance } from './entities/attendance.entity';
import { StaffService } from '../staff/staff.service';
import { CompanyService } from '../company/company.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AttendanceClockInDto } from './dto/attendance.dto';
import {
  AttendanceAlreadyFulfilledError,
  LocationNotMatchError,
  NoStaffFoundError,
} from 'src/errors/ResourceError';
import { StaffDto } from '../staff/dto/staff.dto';
import { IStaff } from '../staff/entities/staff.entity';
import { compareLocation } from 'src/helpers/compare-loc';

jest.mock('src/helpers/compare-loc');

describe('AttendanceService', () => {
  let service: AttendanceService;
  let attendanceRepository: Repository<Attendance>;
  let staffService: StaffService;
  let companyService: CompanyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AttendanceService,
        {
          provide: getRepositoryToken(Attendance),
          useClass: Repository,
        },
        {
          provide: StaffService,
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: CompanyService,
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AttendanceService>(AttendanceService);
    attendanceRepository = module.get<Repository<Attendance>>(
      getRepositoryToken(Attendance),
    );
    staffService = module.get<StaffService>(StaffService);
    companyService = module.get<CompanyService>(CompanyService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('clockIn', () => {
    it('should throw AttendanceAlreadyFulfilledError if there is already an attendance record for the day', async () => {
      const user: IStaff = { id: '1', companyId: '1' } as IStaff;
      jest
        .spyOn(service, 'findByStaffId')
        .mockResolvedValueOnce({} as Attendance);

      await expect(
        service.clockIn(
          { clockIn: '09:00', latitude: '12.34', longitude: '56.78' },
          user,
        ),
      ).rejects.toThrow(AttendanceAlreadyFulfilledError());
    });

    it('should throw LocationNotMatchError if the locations do not match', async () => {
      const user: IStaff = { id: '1', companyId: '1' } as IStaff;
      jest.spyOn(service, 'findByStaffId').mockResolvedValueOnce(null);
      jest
        .spyOn(companyService, 'findOne')
        .mockResolvedValueOnce({ latitude: '1', longitude: '2' } as any);
      (compareLocation as jest.Mock).mockReturnValue(false);

      await expect(
        service.clockIn(
          { clockIn: '09:00', latitude: '12.34', longitude: '56.78' },
          user,
        ),
      ).rejects.toThrow(LocationNotMatchError());
    });

    it('should throw NoStaffFoundError if staff is not found', async () => {
      const user: IStaff = { id: '1', companyId: '1' } as IStaff;
      jest.spyOn(service, 'findByStaffId').mockResolvedValueOnce(null);
      jest
        .spyOn(companyService, 'findOne')
        .mockResolvedValueOnce({ latitude: '1', longitude: '2' } as any);
      (compareLocation as jest.Mock).mockReturnValue(true);
      jest.spyOn(staffService, 'findOne').mockResolvedValueOnce(null);

      await expect(
        service.clockIn(
          { clockIn: '09:00', latitude: '12.34', longitude: '56.78' },
          user,
        ),
      ).rejects.toThrow(NoStaffFoundError());
    });

    it('should save and return the attendance record on successful clock in', async () => {
      const user: IStaff = { id: '1', companyId: '1' } as IStaff;
      const dto: AttendanceClockInDto = {
        clockIn: '09:00',
        latitude: '12.34',
        longitude: '56.78',
      };
      const staffDto = new StaffDto({
        id: '1',
        companyId: '1',
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        email: 'john@example.com',
      });

      const attendance = {
        save: jest.fn().mockResolvedValue({}),
      } as unknown as Attendance;

      jest.spyOn(service, 'findByStaffId').mockResolvedValueOnce(null);
      jest.spyOn(companyService, 'findOne').mockResolvedValueOnce({
        latitude: '12.34',
        longitude: '56.78',
      } as any);
      (compareLocation as jest.Mock).mockReturnValue(true);
      jest.spyOn(staffService, 'findOne').mockResolvedValueOnce(staffDto);
      jest
        .spyOn(attendanceRepository, 'save')
        .mockResolvedValueOnce(attendance);

      const result = await service.clockIn(dto, user);
      expect(result).toEqual(attendance);
      expect(attendance.save).toHaveBeenCalled();
    });
  });
});
