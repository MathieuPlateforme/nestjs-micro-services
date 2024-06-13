export class UserSynchroEvent {
    constructor(public readonly userId: number,public readonly userMail:string,public readonly userFirstname:string,public readonly userLastname) {}
}
