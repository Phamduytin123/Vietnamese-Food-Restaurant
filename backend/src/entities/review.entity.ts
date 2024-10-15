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

    @Column({
        type : 'varchar',
        length : 255,
    })
    comment: string;

    @Column()
    itemId: number;

    @Column()
    accountId: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn({
        nullable: true,
    })
    updatedAt: Date;

    @ManyToOne(() => Item, item => item.reviews)
    @JoinColumn({ name: 'itemId' })
    item: Item;

    @ManyToOne(() => Account, account => account.reviews)
    @JoinColumn({ name: 'accountId' })
    account: Account;
}
