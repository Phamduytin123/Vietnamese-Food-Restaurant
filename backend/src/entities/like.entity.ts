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
import { Item } from './item.entity';

@Entity()
export class Like {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    accountId: number;

    @Column()
    itemId: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Account, account => account.likes)
    @JoinColumn({ name: 'accountId' })
    account: Account;

    @ManyToOne(() => Item, item => item.likes)
    @JoinColumn({ name: 'itemId' })
    item: Item;
}
