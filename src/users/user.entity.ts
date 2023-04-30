import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

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
