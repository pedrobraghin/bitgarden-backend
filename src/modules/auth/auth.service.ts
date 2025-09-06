import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  async validateOAuthLogin(providerProfile: any): Promise<any> {
    let user = await this.userService.getUserByProviderId(providerProfile.id);

    if (!user) {
      user = await this.userService.createUser(providerProfile);
    }

    const payload = { sub: user.id };
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>('JWT_EXPIRES_IN'),
    });

    return {
      accessToken,
    };
  }

  getOAuthProviderUrl(provider: string) {
    let url: string;

    switch (provider) {
      case 'google': {
        url = this.configService.get<string>('GOOGLE_PROVIDER_URL');
        break;
      }
      case 'github':
      default: {
        url = this.configService.get<string>('GITHUB_PROVIDER_URL');
      }
    }

    return { url };
  }
}
