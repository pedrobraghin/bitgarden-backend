import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

@Catch(UnauthorizedException)
export class AlreadyLoggedInRedirectFilter implements ExceptionFilter {
  constructor(readonly configService: ConfigService) {}

  catch(_exception: UnauthorizedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    res.redirect(this.configService.get<string>('FRONT_LOGIN_URL'));
  }
}
