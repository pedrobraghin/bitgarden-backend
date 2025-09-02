import { ExecutionContext, Inject, Injectable, mixin } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { Logger } from 'winston';

export function OAuthGuard(provider: string) {
  @Injectable()
  class BaseAuthGuard extends AuthGuard(provider) {
    constructor(
      readonly configService: ConfigService,
      @Inject(WINSTON_MODULE_PROVIDER) readonly logger: Logger,
    ) {
      super();
    }

    handleRequest<TUser = any>(
      err: any,
      user: any,
      info: any,
      context: ExecutionContext,
    ): TUser {
      const response = context.switchToHttp().getResponse();

      const errorCode = 'ERR_LP_' + provider.toUpperCase(); // refator pra criar um pattern pra error codes

      this.logger.warn(`OAuthGuard > ${errorCode}`, { err, user, info });

      if (err || !user) {
        return response.redirect(
          `${this.configService.get<string>('FRONT_LOGIN_URL')}?error=${encodeURIComponent(errorCode)}`,
        );
      }

      return user;
    }
  }

  return mixin(BaseAuthGuard);
}
