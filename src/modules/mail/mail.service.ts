import { Inject, Injectable } from '@nestjs/common';
import { MailProvider } from './interfaces';
import { MAIL_PROVIDER } from './contants';

@Injectable()
export class MailService {
  constructor(
    @Inject(MAIL_PROVIDER)
    private readonly mailProvider: MailProvider,
  ) {}

  async sendWelcomeEmail(userEmail: string) {
    return await this.mailProvider.sendMail(
      userEmail,
      'Bem vindo ao BitGarden!',
      'Obrigado por se cadastrar em nossa plataforma 🚀\nAgora é só começar a colaborar com novos projetos da comunidade, ou criar o seu próprio projeto. Aproveite!',
    );
  }
}
