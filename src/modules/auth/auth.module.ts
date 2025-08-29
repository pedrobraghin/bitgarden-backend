import { CookieManager } from './utils/cookie-manager';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { GitHubStrategy, GoogleStrategy, JwtStrategy } from './strategies/';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule.register({ session: false }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
  ],
  providers: [
    CookieManager,
    AuthService,
    GitHubStrategy,
    GoogleStrategy,
    JwtStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
