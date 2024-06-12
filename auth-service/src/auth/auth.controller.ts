import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';
import { UserRegistrationDTO } from 'src/entities/userEntity/UserRegistrationDTO';
import { UserCreateEvent } from 'src/event/events/user-created.event';
import { EventEmitter2 } from 'eventemitter2';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly eventEmitter: EventEmitter2
  ) {}

  @MessagePattern('signup')
  async handleSignup(signupDto: UserRegistrationDTO) {
    try {
      const { email, password, firstname, lastname } = signupDto;
      if (!email || !password || !firstname || !lastname) {
        throw new Error('Toutes informations non fournis');
      }

      const userExist = await this.authService.validateUser(email, password);
      if (userExist) {
        throw new Error('utilisateur déjà existant');
      }

      const createUser = await this.authService.register(signupDto);
      this.eventEmitter.emit('User created', new UserCreateEvent(createUser.id, createUser.email));
      return createUser;
    } catch (error) {
      throw error;
    }
  }
}
