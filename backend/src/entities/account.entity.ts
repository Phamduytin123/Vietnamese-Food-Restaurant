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
import { Like } from './like.entity';
import { Review } from './review.entity';

@Entity()
export class Account {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    displayName: string;

    @Column()
    address: string;

    @Column()
    email: string;

    @Column({
        length: 10,
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
        default: null,
    })
    updatedAt: Date = null;

    @OneToMany(() => Cart, cart => cart.account)
    carts: Cart[];

    @OneToMany(() => Order, order => order.account)
    orders: Order[];

    @OneToMany(() => Like, like => like.account)
    likes: Like[];

    @OneToMany(() => Review, review => review.account)
    reviews: Like[];
}
