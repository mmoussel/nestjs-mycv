import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Report } from '../reports/report.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

  @AfterInsert()
  logInsert() {
    console.log('🚀 Inserted User:', this.id, ': ', this.email);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('🚀 Updated User:', this.id, ': ', this.email);
  }

  @AfterRemove()
  logRemove() {
    console.log('🚀 Removed User:', this.id, ': ', this.email);
  }
}
