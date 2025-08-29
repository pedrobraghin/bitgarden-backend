import { Controller, Get, Inject, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Controller('profile')
export class ProfileController {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Req() req: Request) {
    this.logger.info('Hello world log test', { foo: 'bar' });
    return req.user;
  }
}
