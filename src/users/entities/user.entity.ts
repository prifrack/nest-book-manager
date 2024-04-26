import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from './role.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Role, { eager: true, nullable: false })
  @JoinColumn({ name: 'role' })
  @Column('uuid')
  role;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'updatedBy' })
  @Column({ nullable: true })
  updatedBy?: string;
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'deletedBy' })
  @Column('uuid', { nullable: true })
  deletedBy?: string;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;

  @BeforeInsert()
  @BeforeUpdate()
  encryptPassword() {
    if (this.password) this.password = bcrypt.hashSync(this.password, 10);
  }
}
