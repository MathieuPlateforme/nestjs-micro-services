import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { MailDTO } from './mail.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {}

  @EventPattern('send_mail')
  async sendMail(mailData: MailDTO) {
    try {
      await this.appService.sendMail(mailData);
      console.log(mailData)

    } catch (error) {
      console.log(error);
    }
  }
}