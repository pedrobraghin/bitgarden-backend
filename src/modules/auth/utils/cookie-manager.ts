import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CookieOptions } from 'express';

@Injectable()
export class CookieManager {
  constructor(private readonly configService: ConfigService) {}

  accessTokenCookie(token: string): [string, string, CookieOptions] {
    return [
      'access_token',
      token,
      {
        httpOnly: true,
        secure: this.configService.get('NODE_ENV') === 'production',
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 dias
      },
    ];
  }
}
