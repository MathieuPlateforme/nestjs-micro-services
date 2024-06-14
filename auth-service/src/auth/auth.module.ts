import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Roles } from 'src/entities/roleEntity/role.entity';
import { User } from 'src/entities/userEntity/user.entity';
import { UserService } from 'src/entities/userEntity/user.service';
import { JwtService } from '@nestjs/jwt';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventPublisherService } from 'src/event.publisher.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Roles]),
    EventEmitterModule.forRoot(),
   
  ],
  providers: [AuthService, JwtService, UserService, EventPublisherService,],
  controllers: [AuthController],
})
export class AuthModule {}
