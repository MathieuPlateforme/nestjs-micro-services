// commande-service/src/infrastructure/messaging/event-publisher.service.ts
import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { EventEmitter2 } from 'eventemitter2';

@Injectable()
export class EventPublisherService {
    constructor(
        @InjectQueue('order_queue') private readonly orderQueue: Queue,
        private readonly eventEmitter: EventEmitter2,
    ) {
        this.eventEmitter.on('OrderCreated', (event) => this.publishEvent('order.created', event));
        this.eventEmitter.on('OrderUpdated', (event) => this.publishEvent('order.updated', event));
        this.eventEmitter.on('OrderCanceled', (event) => this.publishEvent('order.canceled', event));
    }

    async publishEvent(eventName: string, event: any): Promise<void> {
        await this.orderQueue.add(eventName, event);
    }
}
