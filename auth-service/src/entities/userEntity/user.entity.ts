import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Roles } from '../roleEntity/role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  lastname: string;

  @Column()
  firstname: string;

  @ManyToOne(() => Roles, (role) => role.user)
  role: Roles;
}
