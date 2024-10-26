import { DEFAULT_AVA, AccountGenderEnum, AccountRoleEnum } from '../common';

import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Cart } from './cart.entity';
import { Order } from './order.entity';
import { LikeItem } from './like.entity';
import { Review } from './review.entity';

@Entity()
export class Account {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    displayName: string;

    @Column({ nullable: true })
    address: string;

    @Column()
    email: string;

    @Column({
        length: 10,
        nullable: true
    })
    tel: string;

    @Column({
        default: DEFAULT_AVA,
    })
    avatar: string;

    @Column({
        default: AccountGenderEnum.MALE,
    })
    gender: AccountGenderEnum;

    @Column()
    password: string;

    @Column({
        default: AccountRoleEnum.CUSTOMER,
    })
    role: AccountRoleEnum;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn({
        nullable: true,
    })
    updatedAt: Date;

    @OneToMany(() => Cart, cart => cart.account)
    carts: Cart[];

    @OneToMany(() => Order, order => order.account)
    orders: Order[];

    @OneToMany(() => LikeItem, like => like.account)
    likes: LikeItem[];

    @OneToMany(() => Review, review => review.account)
    reviews: Review[];
}
