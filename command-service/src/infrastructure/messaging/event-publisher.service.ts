import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { EventEmitter2 } from 'eventemitter2';
import { OrderCreatedEvent } from '../../common/events/order-created.event';
import { OrderUpdatedEvent } from '../../common/events/order-updated.event';
import { OrderCanceledEvent } from '../../common/events/order-canceled.event';

@Injectable()
export class EventPublisherService {
    private client: ClientProxy;

    constructor(private readonly eventEmitter: EventEmitter2) {
        this.client = ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: ['amqp://localhost:5672'],
                queue: 'events-queue',
                queueOptions: {
                    durable: true,
                },
            },
        });

        this.eventEmitter.on('order.created', (event: OrderCreatedEvent) => this.publishEvent('order.created', event));
        this.eventEmitter.on('order.updated', (event: OrderUpdatedEvent) => this.publishEvent('order.updated', event));
        this.eventEmitter.on('orderCanceled', (event: OrderCanceledEvent) => this.publishEvent('order.canceled', event));
    }

    async publishEvent(eventName: string, event: any): Promise<void> {
        await this.client.emit(eventName, event).toPromise();
    }
}
