import { SetMetadata } from '@nestjs/common';
import { AuthEntityTypeEnum } from 'src/types/enums';

export const Role = (...args: AuthEntityTypeEnum[]) =>
  SetMetadata('roles', args);
