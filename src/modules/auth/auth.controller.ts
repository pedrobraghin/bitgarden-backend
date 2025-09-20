import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  Req,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';

import { CookieManager } from './utils';
import { OAuthGuard, LoggedInGuard } from './guards';
import { GetOAuthProviderDto } from './dtos';
import { AuthService } from './auth.service';
import { AlreadyLoggedInRedirectFilter } from 'src/common';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly cookieManager: CookieManager,
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}

  @Get('github')
  @UseGuards(LoggedInGuard, OAuthGuard('github'))
  @UseFilters(AlreadyLoggedInRedirectFilter)
  async githubLogin() {}

  @Get('github/callback')
  @UseGuards(OAuthGuard('github'))
  async githubCallback(@Res() res: Response, @Req() req: Request) {
    this.handleOAuthRedirect(res, req.user);
  }

  @Get('google')
  @UseGuards(LoggedInGuard, OAuthGuard('google'))
  @UseFilters(AlreadyLoggedInRedirectFilter)
  async logingoogle() {}

  @Get('google/callback')
  @UseGuards(OAuthGuard('google'))
  async linkedinCallback(@Res() res: Response, @Req() req: Request) {
    this.handleOAuthRedirect(res, req.user);
  }

  @Get('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  logout(@Res() res: Response) {
    const { cookie, options } = this.cookieManager.getLogoutCookieData();

    res.clearCookie(cookie, options);
  }

  @Get('oauth-url')
  getOAuthUrl(@Query() { provider }: GetOAuthProviderDto) {
    return this.authService.getOAuthProviderUrl(provider);
  }

  private handleOAuthRedirect(res: Response, data: { accessToken?: string }) {
    if (!data?.accessToken) {
      res.redirect(this.configService.get<string>('FRONT_LOGIN_URL'));
      return;
    }

    res.cookie(...this.cookieManager.getAccessTokenCookie(data.accessToken));
    res.redirect(this.configService.get<string>('FRONT_URL'));
  }
}
