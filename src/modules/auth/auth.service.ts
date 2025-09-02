import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ProfileService } from '../profile/profile.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly profileService: ProfileService,
  ) {}

  async validateOAuthLogin(providerProfile: any): Promise<any> {
    let profile = await this.profileService.getProfileByProviderId(
      providerProfile.id,
    );

    if (!profile) {
      profile = await this.profileService.createProfile(providerProfile);
    }

    const payload = { sub: profile.id };
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>('JWT_EXPIRES_IN'),
    });

    return {
      accessToken,
    };
  }
}
