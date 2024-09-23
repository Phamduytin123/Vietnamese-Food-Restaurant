import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Item } from './item.entity';
import { Account } from './account.entity';

@Entity()
export class Review {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    rating: number;

    @Column()
    comment: string;

    @Column()
    itemId : number;

    @Column()
    accountId : number;

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

    @ManyToOne(() => Item, item => item.reviews)
    @JoinColumn({name : "itemId"})
    item: Item;

    @ManyToOne(() => Account, account => account.reviews)
    @JoinColumn({name : "accountId"})
    account: Account;
}
