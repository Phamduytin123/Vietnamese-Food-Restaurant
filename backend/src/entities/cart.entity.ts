import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Account } from './account.entity';
import { ItemSize } from './item-size.entity';

@Entity()
export class Cart {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantity: number;

    @Column()
    accountId: number;

    @Column()
    itemSizeId: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Account, account => account.carts)
    @JoinColumn({ name: 'accountId' })
    account: Account;

    @ManyToOne(() => ItemSize, itemSize => itemSize.carts)
    @JoinColumn({ name: 'itemSizeId' })
    itemSize: ItemSize;
}
