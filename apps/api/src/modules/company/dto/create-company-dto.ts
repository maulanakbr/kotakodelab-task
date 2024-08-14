import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { Resource } from 'src/common/resource';

export class CreateCompanyDto extends Resource {
  @ApiProperty({ description: 'Name of the company', required: true })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'Description of the company', required: false })
  @IsString()
  @IsOptional()
  readonly description?: string | null;

  @ApiProperty({ description: 'Address of the company', required: true })
  @IsString()
  readonly address: string;

  @ApiProperty({ description: 'City of the company', required: true })
  @IsString()
  readonly city: string;

  @ApiProperty({ description: 'Latitude of the company', required: true })
  @IsString()
  readonly latitude: string;

  @ApiProperty({ description: 'Longitude of the company', required: true })
  @IsString()
  readonly longitude: string;
}
