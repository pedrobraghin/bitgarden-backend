import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CookieOptions } from 'express';

@Injectable()
export class CookieManager {
  readonly accessTokenCookieName = 'access_token';
  constructor(private readonly configService: ConfigService) {}

  getAccessTokenCookie(token: string): [string, string, CookieOptions] {
    return [
      this.accessTokenCookieName,
      token,
      {
        httpOnly: true,
        secure: this.configService.get('NODE_ENV') === 'production',
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 dias
      },
    ];
  }

  getLogoutCookieData(): { cookie: string; options: CookieOptions } {
    return {
      cookie: this.accessTokenCookieName,
      options: {
        httpOnly: true,
        secure: this.configService.get('NODE_ENV') === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 0,
      },
    };
  }
}
