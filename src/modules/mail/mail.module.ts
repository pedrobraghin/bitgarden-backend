import { Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MAIL_PROVIDER } from './contants';
import { MailgunProvider } from './providers';

@Global()
@Module({
  providers: [
    { provide: MAIL_PROVIDER, useClass: MailgunProvider },
    MailService,
  ],
  exports: [MailService],
})
export class MailModule {}
