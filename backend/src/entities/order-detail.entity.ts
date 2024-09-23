import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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

    @Column()
    orderId : number;

    @ManyToOne(() => Order, order => order.orderDetails)
    @JoinColumn({name : "orderId"})
    order: Order;

    @ManyToOne(() => ItemSize, itemSize => itemSize.orderDetails)
    @JoinColumn({name : "itemSizeId"})
    itemSize: ItemSize;
}
