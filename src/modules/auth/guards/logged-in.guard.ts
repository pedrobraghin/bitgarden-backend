import { CookieManager } from './../utils/cookie-manager.util';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly cookieManager: CookieManager,
    private readonly jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();

    const token = req.cookies[this.cookieManager.accessTokenCookieName];

    if (!token) {
      return true;
    }
    try {
      this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      throw new UnauthorizedException();
    } catch (err) {
      return true;
    }
  }
}
