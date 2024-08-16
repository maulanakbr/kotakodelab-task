import { CreateStaffDto } from './create-staff.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateStaffDto extends PartialType(CreateStaffDto) {}
