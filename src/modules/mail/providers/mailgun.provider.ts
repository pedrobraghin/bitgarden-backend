import { Injectable } from '@nestjs/common';
import { MailProvider } from '../interfaces';
import { ConfigService } from '@nestjs/config';

import FormData from 'form-data';
import Mailgun from 'mailgun.js';
import { IMailgunClient } from 'mailgun.js/Interfaces/MailgunClient/index.js';

@Injectable()
export class MailgunProvider implements MailProvider {
  private readonly mg: IMailgunClient;
  private readonly mailgunDomain: string;

  constructor(readonly configService: ConfigService) {
    const mailgun = new Mailgun(FormData);
    this.mg = mailgun.client({
      username: 'api',
      key: configService.get('MAILGUN_API_KEY'),
    });
    this.mailgunDomain = configService.get('MAILGUN_DOMAIN');
  }

  async sendMail(to: string, subject: string, body: string): Promise<boolean> {
    try {
      await this.mg.messages.create(this.mailgunDomain, {
        from: `No-Reply <no-reply@${this.mailgunDomain}>`,
        to: [to],
        subject,
        text: body,
      });

      return true;
    } catch (err) {
      return false;
    }
  }
}
