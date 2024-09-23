import { OrderPaymentMethodEnum } from '../common/enums/order-payment-method.enum';
import { OrderStatusEnum } from '../common/enums/order-status.enum';
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

    @Column()
    reasonCancel: string;

    @Column()
    note: string;

    @Column()
    accountId: number;

    @Column()
    voucherId: number;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        nullable: true,
    })
    updatedAt: Date = null;

    @ManyToOne(() => Account, account => account.orders)
    @JoinColumn({ name: 'accountId' })
    account: Account;

    @OneToMany(() => OrderDetail, orderDetail => orderDetail.order)
    orderDetails: OrderDetail[];

    @ManyToOne(() => Voucher, voucher => voucher.orders)
    @JoinColumn({ name: 'voucherId' })
    voucher: Voucher;
}
