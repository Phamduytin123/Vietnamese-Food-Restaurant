import { OrderPaymentMethodEnum, OrderStatusEnum } from '../common';

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Account } from './account.entity';
import { OrderDetail } from './order-detail.entity';
import { Voucher } from './voucher.entity';
import { Review } from './review.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  totalPrice: number;

  @Column({
    length: 10,
  })
  phoneNumber: string;

  @Column()
  receiver: string;

  @Column()
  address: string;

  @Column()
  email: string;

  @Column({
    default: OrderPaymentMethodEnum.CASH,
  })
  paymentMethod: OrderPaymentMethodEnum;

  @Column({
    default: OrderStatusEnum.WAIT,
  })
  status: OrderStatusEnum;

  @Column({
    nullable: true,
  })
  reasonCancel: string;

  @Column({
    nullable: true,
  })
  note: string;

  @Column()
  accountId: number;

  @Column({
    default: false,
  })
  isPaid: boolean;

  @Column({
    nullable: true,
  })
  paymentCode: string;

  @Column({
    nullable: true,
  })
  voucherId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({
    nullable: true,
  })
  updatedAt: Date;

  @ManyToOne(() => Account, account => account.orders, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'accountId' })
  account: Account;

  @OneToMany(() => OrderDetail, orderDetail => orderDetail.order, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  orderDetails: OrderDetail[];

  @OneToMany(() => Review, review => review.order, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  reviews: Review[];

  @ManyToOne(() => Voucher, voucher => voucher.orders, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'voucherId' })
  voucher: Voucher;
}
