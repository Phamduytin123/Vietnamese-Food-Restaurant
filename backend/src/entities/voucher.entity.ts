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

    @Column()
    name_vi: string;

    @Column()
    name_en: string;

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

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Order, order => order.voucher)
    orders: Order;
}
