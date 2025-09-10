import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { Profile, User } from 'src/@types';

export const UserData = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

export type UserDataType = User & { profile: Profile };
