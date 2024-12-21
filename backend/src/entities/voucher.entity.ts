import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class Voucher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  name_vi: string;

  @Column({
    nullable: true,
  })
  name_en: string;

  @Column()
  code: string;

  @Column()
  discount: number;

  @Column()
  minPrice: number;

  @Column()
  startAt: Date;

  @Column()
  endAt: Date;

  @Column({
    default: 0,
  })
  count: number;

  @Column({
    default: false,
  })
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({
    nullable: true,
  })
  updatedAt: Date;

  @OneToMany(() => Order, order => order.voucher, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  orders: Order[];
}
