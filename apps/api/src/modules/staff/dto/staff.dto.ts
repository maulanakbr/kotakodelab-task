import { Exclude } from 'class-transformer';
import { IsEmpty, IsNotEmpty, IsObject, IsString } from 'class-validator';
import { Resource } from 'src/common/resource';
import { Staff } from '../entities/staff.entity';
import { Company } from 'src/modules/company/entities/company.entity';

export class StaffDto extends Resource {
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  readonly staffId: string;

  @IsEmpty()
  @IsString()
  readonly companyId?: string | null;

  @IsNotEmpty()
  @IsString()
  readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  readonly lastName: string;

  @IsString()
  readonly fullName: string;

  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @IsObject()
  readonly company: Company;

  @Exclude()
  readonly passwordHash: string;

  @Exclude()
  readonly accessToken: string;

  constructor(partial: Partial<Staff>) {
    super();
    this.fullName = partial?.firstName + ' ' + partial?.lastName;
    Object.assign(this, partial);
  }
}
