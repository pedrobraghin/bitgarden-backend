import { Module } from '@nestjs/common';

import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProfileModule } from './modules/profile/profile.module';
import { HttpModule } from '@nestjs/axios';
import { DatabaseModule } from './modules';
import { WinstonModule } from 'nest-winston';

import * as winston from 'winston';
import LokiTransport from 'winston-loki';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './common';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HttpModule.register({ global: true }),
    WinstonModule.forRoot({
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
          replaceTimestamp: true,
          batching: false,
          onConnectionError: (err) => {
            console.error('Loki connection error:', err);
          },
        }),
      ],
    }),
    AuthModule,
    ProfileModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
  exports: [],
})
export class AppModule {}
