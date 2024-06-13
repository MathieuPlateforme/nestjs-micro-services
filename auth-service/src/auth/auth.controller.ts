import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';
import { UserRegistrationDTO } from 'src/entities/userEntity/UserRegistrationDTO';
import { UserCreateEvent } from 'src/event/events/user-created.event';
import { EventEmitter2 } from 'eventemitter2';
import { SigninDto } from 'src/entities/userEntity/signup.dto';
import { UserSynchroEvent } from 'src/event/events/user-synchro.event';
import { MailDTO } from 'src/entities/mail.DTO';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly eventEmitter: EventEmitter2
    ) { }

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
            this.eventEmitter.emit('Usercreated', new UserCreateEvent(createUser.id, createUser.email));
            const dto=new MailDTO;
            dto.to=createUser.email,
            dto.subject='Utilisateur créer'
            dto.text='Vous avez bien créer votre compte,Bienvenue chez nous!'
            this.eventEmitter.emit('send_mail',dto)
                

            
            return createUser;
        } catch (error) {
            throw error;
        }
    }
    @MessagePattern('signin')
    async handleSignin(signinDto: SigninDto) {
        try {
            const result = await this.authService.login(signinDto);
            return result;
        } catch (error) {
            throw error;
        }
    }

    @MessagePattern('info')
    async handleInfo(id: number) {
        try {
            const result = await this.authService.info(id);
            this.eventEmitter.emit('synchro_auth', new UserSynchroEvent(result.id, result.email,result.firstname,result.lastname));
            return result;
        } catch (error) {
            throw error;
        }
    }
}

