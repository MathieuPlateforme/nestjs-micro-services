import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from 'eventemitter2';
import { UserCreateEvent } from './event/events/user-created.event';
import { UserSynchroEvent } from './event/events/user-synchro.event';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { UserCreatedMailEvent } from './event/events/user-createdmail.event';

@Injectable()
export class EventPublisherService {
    private client: ClientProxy;

    constructor(private readonly eventEmitter: EventEmitter2) {
        this.client = ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: ['amqp://localhost:5672'],
                queue: 'orders-queue',
                queueOptions: {
                    durable: true,
                },
            },
        });

        this.eventEmitter.on('Usercreated', (event: UserCreateEvent) => this.publishEvent('user.created', event));
        this.eventEmitter.on('synchro_auth', (event: UserSynchroEvent) => this.publishEvent('synchro_auth', event));
        this.eventEmitter.on('send_mail',(event:UserCreatedMailEvent)=>this.publishEvent('send_mail',event));
    }

    async publishEvent(eventName: string, event: any): Promise<void> {
        await this.client.emit(eventName, event).toPromise();
    }
}
