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

    @ManyToOne(() => Account, account => account.carts)
    @JoinColumn({ name: 'accountId' })
    account: Account;

    @ManyToOne(() => ItemSize, itemSize => itemSize.carts)
    @JoinColumn({ name: 'itemSizeId' })
    itemSize: ItemSize;
}
