import { ItemAvailabilityEnum } from '../common/enums/item-availability.enum';
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { ItemSize } from './item-size.entity';
import { Category } from './category.entity';
import { Like } from './like.entity';
import { Review } from './review.entity';

@Entity()
export class Item {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        default: 0,
    })
    discount: number;

    @Column()
    carbohydrates: number;

    @Column()
    protein: number;

    @Column()
    cholesterol: number;

    @Column()
    sodium: number;

    @Column()
    fiber: number;

    @Column()
    description: string;

    @Column({
        default: ItemAvailabilityEnum.IN_STOCK,
    })
    availability: ItemAvailabilityEnum;

    @Column({
        type: 'float',
        default: 5.0,
    })
    rating: number;

    @Column({
        type: 'varchar',
        default: '[]',
    })
    ingredients: string;

    @Column({
        type: 'varchar',
        default: '[]',
    })
    images: string;

    @Column()
    regional: string;

    @Column({
        default: true,
    })
    isFood: boolean;

    @Column({
        default: false,
    })
    isDeleted: boolean;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date;

    @ManyToOne(() => Category, category => category.items)
    category: Category;

    @OneToMany(() => ItemSize, itemSize => itemSize.item)
    itemSizes: ItemSize[];

    @OneToMany(() => Like, like => like.item)
    likes: Like[];

    @OneToMany(() => Review, review => review.item)
    reviews: Review[];
}
