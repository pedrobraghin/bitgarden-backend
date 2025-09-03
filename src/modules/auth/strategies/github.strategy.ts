import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';
import { DoneCallback } from 'passport';

@Injectable()
export class GitHubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    private readonly authService: AuthService,
    readonly configService: ConfigService,
  ) {
    super({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: configService.get<string>('GITHUB_CALLBACK_URL'),
      scope: ['user:email', 'read:user'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: DoneCallback,
  ) {
    try {
      return await this.authService.validateOAuthLogin(profile);
    } catch (err) {
      done(err, false);
    }
  }
}
