import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleNotMatchError } from 'src/errors/ResourceError';
import { AuthEntityTypeEnum } from 'src/types/enums';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<AuthEntityTypeEnum[]>(
      'roles',
      context.getHandler(),
    );
    if (!roles) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const userRole = user.role;
    if (!roles.includes(userRole)) RoleNotMatchError();

    return true;
  }
}
