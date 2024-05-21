export default interface User{
    id: number;
    firstName: string;
    lastName: string;
    picture: string;
    isActive: boolean;
    birthday:null | Date;
    sex: string;
    role:number;
    email:string;
}