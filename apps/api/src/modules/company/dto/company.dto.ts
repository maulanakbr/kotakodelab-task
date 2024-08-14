import { IsEmpty, IsNotEmpty, IsString } from 'class-validator';
import { Resource } from 'src/common/resource';

export class CompanyDto extends Resource {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsEmpty()
  @IsString()
  readonly description?: string;

  @IsNotEmpty()
  @IsString()
  readonly address: string;

  @IsNotEmpty()
  @IsString()
  readonly city: string;

  @IsNotEmpty()
  @IsString()
  readonly latitude: string;

  @IsNotEmpty()
  @IsString()
  readonly longitude: string;
}
