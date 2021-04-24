import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  /** ユーザID */
  @Column({
    unique: false,
    nullable: false,
    length: 50,
    type: 'varchar',
  })
  userId: string;

  /** パスワード */
  @Column({ nullable: false, type: 'varchar', length: 50 })
  pass: string;

  /** email */
  @Column({ nullable: true, type: 'varchar', length: 255 })
  email: string;

  /** 表示名 */
  @Column({ nullable: true, type: 'varchar', length: 15 })
  displayName: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt?: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt?: Date;
}
