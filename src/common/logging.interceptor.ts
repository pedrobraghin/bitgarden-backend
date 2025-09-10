import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import type { Logger as WinstonLogger } from 'winston';
import { Inject } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: WinstonLogger,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, body, headers } = request;
    const now = Date.now();

    return next.handle().pipe(
      tap((responseBody) => {
        const responseTime = Date.now() - now;
        this.logger.log('HTTP Request', {
          timestamp: new Date().toISOString(),
          method,
          url,
          body,
          headers: {
            authorization: headers['authorization'] ? '***' : undefined,
            correlationId: headers['x-correlation-id'],
          },
          response: responseBody,
          responseTime,
        });
      }),
    );
  }
}
