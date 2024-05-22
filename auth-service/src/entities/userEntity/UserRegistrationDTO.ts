import { Role } from "../roleEntity/role.dto";

export class UserRegistrationDTO {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role: Role;
    constructor(firstname: string, lastname: string, email: string, password: string, role: Role) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.role = role;
    }
}
