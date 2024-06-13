export class UserCreatedMailEvent {
    constructor(public readonly to:string,public readonly subject:string,public readonly text:string) {}
}