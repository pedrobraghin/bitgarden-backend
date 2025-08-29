import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';

import { CookieManager } from './utils';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly cookieManager: CookieManager,
    private readonly configService: ConfigService,
  ) {}

  @Get('github')
  @UseGuards(AuthGuard('github'))
  async githubLogin() {}

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  githubCallback(@Res() res: Response, @Req() req: Request) {
    res.cookie(
      ...this.cookieManager.accessTokenCookie(req.user['accessToken']),
    );
    return res.redirect(this.configService.get<string>('FRONT_URL')); // Redireciona após o login
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async logingoogle() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async linkedinCallback(@Res() res: Response, @Req() req: Request) {
    res.cookie(
      ...this.cookieManager.accessTokenCookie(req.user['accessToken']),
    );
    return res.redirect(this.configService.get<string>('FRONT_URL')); // Redireciona após o login
  }
}
