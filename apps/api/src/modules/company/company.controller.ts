import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/decorators/user.decorator';
import { IStaff } from '../staff/entities/staff.entity';
import { CompanyService } from './company.service';
import { JwtAuthGuard } from '../auth/guard/auth.guard';
import { CreateCompanyDto } from './dto/create-company-dto';
import { Role } from 'src/decorators/role.decorator';
import { AuthEntityTypeEnum } from 'src/types/enums';
import { RoleGuard } from '../auth/guard/role.guard';

@Controller({ version: '1', path: 'companies' })
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @Role(AuthEntityTypeEnum.SUPERADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async create(@CurrentUser() user: IStaff, @Body() options: CreateCompanyDto) {
    const company = await this.companyService.create(options);
    return { data: company };
  }

  @Get(':companyId')
  @Role(AuthEntityTypeEnum.SUPERADMIN, AuthEntityTypeEnum.STAFF)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async findOne(@Param('companyId') companyId: string) {
    const company = await this.companyService.findOne(companyId, undefined);
    return { data: company };
  }

  @Get()
  @Role(AuthEntityTypeEnum.SUPERADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async findAll() {
    const company = await this.companyService.findAll();
    return { data: company };
  }
}
