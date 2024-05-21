
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @Column()
  picture: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  birthday:null | Date;

  @Column()
  sex: string;

  @Column()
  role:number;

  @Column()
  email:string;

}