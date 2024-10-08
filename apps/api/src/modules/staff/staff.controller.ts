import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  ValidationPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { StaffService } from './staff.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { GetStaffDto } from './dto/get-staff.dto';
import { JwtAuthGuard } from '../auth/guard/auth.guard';
import { AuthEntityTypeEnum } from 'src/types/enums';
import { Role } from 'src/decorators/role.decorator';
import { RoleGuard } from '../auth/guard/role.guard';
import { CurrentUser } from 'src/decorators/user.decorator';
import { IStaff } from './entities/staff.entity';
import { Public } from 'src/decorators/public.decorator';

@Controller({ version: '1', path: 'staffs' })
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Post()
  // @Role(AuthEntityTypeEnum.SUPERADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Public()
  async create(@Body() options: CreateStaffDto) {
    const staff = await this.staffService.create(options);
    return { data: staff };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Query(ValidationPipe) options: GetStaffDto) {
    const { staffs, count, meta } = await this.staffService.findAll(options);
    return { data: staffs, count, meta };
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    const admin = await this.staffService.findOne({ id });

    return { data: admin };
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  async update(@CurrentUser() user: IStaff, @Body() options: UpdateStaffDto) {
    const admin = await this.staffService.update(user.id, options);
    return { data: admin };
  }
}
