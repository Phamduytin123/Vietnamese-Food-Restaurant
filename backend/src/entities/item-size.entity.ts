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

@Entity()
export class ItemSize {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    size_vi: string;

    @Column()
    size_en: string;

    @Column()
    price: number;

    @Column()
    itemId: number;

    @ManyToOne(() => Item, item => item.itemSizes)
    @JoinColumn({ name: 'itemId' })
    item: Item;

    @OneToMany(() => Cart, cart => cart.itemSize)
    carts: Cart[];

    @OneToMany(() => OrderDetail, orderDetail => orderDetail.itemSize)
    orderDetails: OrderDetail[];
}
