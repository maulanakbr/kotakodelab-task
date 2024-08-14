import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { AuthEntityTypeEnum } from 'src/types/enums';
import { Staff } from '../entities/staff.entity';

export class CreateStaffDto {
  // @ApiProperty({ required: true })
  // @IsString()
  // readonly staffId: string;

  @ApiProperty({ description: 'First name of the staff', required: true })
  @IsString()
  readonly firstName: string;

  @ApiProperty({ description: 'Last name of the staff', required: true })
  @IsString()
  readonly lastName: string;

  @ApiProperty({ description: 'CompanyID of the staff', required: false })
  @IsString()
  @IsOptional()
  @ValidateIf((obj: Staff) => obj.companyId !== null && obj.companyId !== '')
  readonly companyId?: string | null;

  @ApiProperty({
    description: 'Role of the staff',
    required: false,
    example: AuthEntityTypeEnum.STAFF,
  })
  @IsEnum(AuthEntityTypeEnum)
  @IsOptional()
  @ValidateIf(
    (obj: Staff) => obj.role !== null && obj.role in AuthEntityTypeEnum,
  )
  readonly role?: AuthEntityTypeEnum;

  @ApiProperty({ description: 'Username of the staff', required: true })
  @IsString()
  readonly username: string;

  @ApiProperty({ description: 'Email of the staff', required: true })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ description: 'Password of the staff', required: true })
  @IsString()
  readonly password: string;
}
