// src/common/events/order-updated.event.ts
export class OrderUpdatedEvent {
    constructor(public readonly orderId: string, public readonly status: string) {}
}
