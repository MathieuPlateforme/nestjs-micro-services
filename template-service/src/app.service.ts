import { Injectable, Inject } from '@nestjs/common';
import { UserDto } from './user.dto';
import { ClientProxy } from '@nestjs/microservices';
import { MailDTO } from './mail.dto';

@Injectable()
export class AppService {
  constructor(@Inject('MAIL-SERVICE') private readonly mailService: ClientProxy) {}

  async handleUserCreation(userDto: UserDto) {
    console.log('User created', userDto);

    const mail = new MailDTO();
    mail.to = userDto.email;
    mail.subject = 'Welcome to our platform';
    mail.html = 'Your account has been created successfully';

    this.mailService.emit('send_mail', mail);

    return userDto;
  }
}
