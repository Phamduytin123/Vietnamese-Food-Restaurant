import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Item } from './item.entity';
import { Account } from './account.entity';
import { ItemSize } from './item-size.entity';
import { Order } from './order.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rating: number;

  @Column({
    type: 'varchar',
    length: 255,
  })
  comment: string;

  @Column()
  itemSizeId: number;

  @Column()
  orderId: number;  

  @Column()
  accountId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({
    nullable: true,
  })
  updatedAt: Date;

  @ManyToOne(() => ItemSize, itemSize => itemSize.reviews)
  @JoinColumn({ name: 'itemSizeId' })
  itemSize: ItemSize;

  @ManyToOne(() => Order, order => order.reviews)
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @ManyToOne(() => Account, account => account.reviews)
  @JoinColumn({ name: 'accountId' })
  account: Account;
}
