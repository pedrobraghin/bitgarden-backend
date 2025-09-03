import { Controller, Get, Query, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';

import { CookieManager } from './utils';
import { OAuthGuard, LoggedInGuard } from './guards';
import { GetOAuthProviderDto } from './dtos';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly cookieManager: CookieManager,
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}

  @Get('github')
  @UseGuards(LoggedInGuard, OAuthGuard('github'))
  async githubLogin() {}

  @Get('github/callback')
  @UseGuards(OAuthGuard('github'))
  githubCallback(@Res() res: Response, @Req() req: Request) {
    this.handleOAuthRedirect(res, req.user);
  }

  @Get('google')
  @UseGuards(LoggedInGuard, OAuthGuard('google'))
  async logingoogle() {}

  @Get('google/callback')
  @UseGuards(OAuthGuard('google'))
  async linkedinCallback(@Res() res: Response, @Req() req: Request) {
    this.handleOAuthRedirect(res, req.user);
  }

  @Get('logout')
  logout(@Res() res: Response) {
    const { cookie, options } = this.cookieManager.getLogoutCookieData();

    res.clearCookie(cookie, options);

    return res.redirect(this.configService.get<string>('FRONT_LOGIN_URL'));
  }

  @Get('oauth-url')
  getOAuthUrl(@Query() { provider }: GetOAuthProviderDto) {
    return this.authService.getOAuthProviderUrl(provider);
  }

  private handleOAuthRedirect(
    res: Response,
    { accessToken }: { accessToken?: string },
  ) {
    if (!accessToken) {
      res.redirect(this.configService.get<string>('FRONT_LOGIN_URL'));
      return;
    }

    res.cookie(...this.cookieManager.getAccessTokenCookie(accessToken));
    res.redirect(this.configService.get<string>('FRONT_URL'));
  }
}
