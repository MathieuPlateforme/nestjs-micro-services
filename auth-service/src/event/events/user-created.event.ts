// src/common/events/order-created.event.ts
export class UserCreateEvent {
    constructor(public readonly userId: number,public readonly userMail:string,) {}
}
