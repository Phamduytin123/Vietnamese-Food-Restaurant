import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';
import { ItemSize } from './item-size.entity';

@Entity()
export class OrderDetail {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    itemSizeId: number;

    @Column()
    price: number;

    @Column()
    quantity: number;

    @ManyToOne(() => Order, order => order.orderDetails)
    order: Order;

    @ManyToOne(() => ItemSize, itemSize => itemSize.orderDetails)
    itemSize: ItemSize;
}
