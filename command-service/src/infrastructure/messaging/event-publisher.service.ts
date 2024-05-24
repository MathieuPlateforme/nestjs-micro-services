// src/messaging/event-publisher.service.ts
import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { EventEmitter2 } from 'eventemitter2';
import {OrderCreatedEvent} from "../../common/events/order-created.event";
import {OrderUpdatedEvent} from "../../common/events/order-updated.event";
import {OrderCanceledEvent} from "../../common/events/order-canceled.event";


@Injectable()
export class EventPublisherService {
    private client: ClientProxy;

    constructor(private readonly eventEmitter: EventEmitter2) {
        this.client = ClientProxyFactory.create({
            transport: Transport.TCP,
            options: {
                host: 'localhost',
                port: 3001,
            },
        });

        this.eventEmitter.on('OrderCreated', (event: OrderCreatedEvent) => this.publishEvent('order.created', event));
        this.eventEmitter.on('OrderUpdated', (event: OrderUpdatedEvent) => this.publishEvent('order.updated', event));
        this.eventEmitter.on('OrderCanceled', (event: OrderCanceledEvent) => this.publishEvent('order.canceled', event));
    }

    async publishEvent(eventName: string, event: any): Promise<void> {
        await this.client.emit(eventName, event);
    }
}
