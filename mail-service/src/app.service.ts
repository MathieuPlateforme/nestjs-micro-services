import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { MailDTO } from './mail.dto';


@Injectable()
export class AppService {

  private readonly transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
        user: 'charles61@ethereal.email',
        pass: 'zx75cYunyddatCCknc',
    },
  })

  async sendMail(mailData: MailDTO) {
    try{
      await this.transporter.sendMail(mailData);
    } catch (error) {
      console.log(error);
    }
  }
}
