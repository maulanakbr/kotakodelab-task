import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Staff } from 'src/modules/staff/entities/staff.entity';

export const CurrentUser = createParamDecorator<
  unknown,
  ExecutionContext,
  Staff
>((_: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});
