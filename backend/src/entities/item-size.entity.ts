import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Item } from './item.entity';
import { Cart } from './cart.entity';
import { OrderDetail } from './order-detail.entity';
import { Review } from './review.entity';

@Entity()
export class ItemSize {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  size_vi: string;

  @Column({
    nullable: true,
  })
  size_en: string;

  @Column()
  price: number;

  @Column()
  itemId: number;

  @ManyToOne(() => Item, item => item.itemSizes, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'itemId' })
  item: Item;

  @OneToMany(() => Cart, cart => cart.itemSize, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  carts: Cart[];

  @OneToMany(() => OrderDetail, orderDetail => orderDetail.itemSize, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  orderDetails: OrderDetail[];

  @OneToMany(() => Review, review => review.itemSize, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  reviews: Review[];

  getActualPrice(): number {
    const discount = this.item.discount ?? 0;
    const actualPrice = this.price * (1 - discount * 0.01) ;
    return actualPrice;
  }
}
