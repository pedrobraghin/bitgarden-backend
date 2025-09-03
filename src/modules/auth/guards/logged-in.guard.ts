import { CookieManager } from './../utils/cookie-manager.util';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly cookieManager: CookieManager,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    const res = context.switchToHttp().getResponse<Response>();

    const token = req.cookies[this.cookieManager.accessTokenCookieName];

    if (token) {
      res.redirect(this.configService.get<string>('FRONT_URL'));
      return false;
    }

    return true;
  }
}
