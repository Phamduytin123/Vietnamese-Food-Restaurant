import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Item } from './item.entity';
import { Cart } from './cart.entity';
import { OrderDetail } from './order-detail.entity';

@Entity()
export class ItemSize {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    size: string;

    @Column()
    price: number;

    @ManyToOne(() => Item, item => item.itemSizes)
    item: Item;

    @OneToMany(() => Cart, cart => cart.itemSize)
    carts: Cart[];

    @OneToMany(() => OrderDetail, orderDetail => orderDetail.itemSize)
    orderDetails: OrderDetail[];
}
