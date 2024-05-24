// src/common/events/order-canceled.event.ts
export class OrderCanceledEvent {
    constructor(public readonly orderId: string) {}
}
