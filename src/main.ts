import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import CookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common';

import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import LokiTransport from 'winston-loki';

class Main {
  async bootstrap() {
    const app = await NestFactory.create(AppModule, {
      bufferLogs: true,
    });

    const httpAdapterHost = app.get(HttpAdapterHost);

    app.enableCors({
      origin: true,
      credentials: true,
    });
    app.setGlobalPrefix(process.env.API_PREFIX);
    app.use(CookieParser());

    app.useGlobalFilters(new HttpExceptionFilter(httpAdapterHost));

    await app.listen(process.env.PORT);
  }

  configureLogger() {
    return WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
          ),
        }),

        new LokiTransport({
          host: process.env.LOKI_HOST,
          // basicAuth: `${process.env.LOKI_USER}:${process.env.LOKI_API_KEY}`,
          labels: { app: 'bitgarden' },
          json: true,
          batching: false,
          replaceTimestamp: true,
        }),
      ],
    });
  }
}

new Main().bootstrap();
