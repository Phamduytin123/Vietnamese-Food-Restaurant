import { ItemAvailabilityEnum } from '../common/enums/item-availability.enum';
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
import { ItemSize } from './item-size.entity';
import { Category } from './category.entity';
import { Like } from './like.entity';
import { Review } from './review.entity';

@Entity()
export class Item {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name_vi: string;

    @Column()
    name_en: string;

    @Column({
        default: 0,
    })
    discount: number;

    @Column({
        nullable : true,
    })
    carbohydrates: number;

    @Column({
        nullable: true,
    })
    protein: number;

    @Column({
        nullable: true
    })
    cholesterol: number;

    @Column({
        nullable: true
    })
    sodium: number;

    @Column({
        nullable: true
    })
    fiber: number;

    @Column()
    description_vi: string;

    @Column()
    description_en: string;

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
        length: 1000,
    })
    ingredients_vi: string;

    @Column({
        type: 'varchar',
        default: '[]',
        length: 1000,
    })
    ingredients_en: string;

    @Column()
    unit_vi: string;

    @Column()
    unit_en: string;

    @Column({
        type: 'varchar',
        default: '[]',
        length: 2000,
    })
    images: string;

    @Column({
        nullable: true
    })
    regional_vi: string;

    @Column({
        nullable: true
    })
    regional_en: string;

    @Column({
        default: true,
    })
    isFood: boolean;

    @Column({
        default: false,
    })
    isDeleted: boolean;

    @Column()
    categoryId: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn({
        nullable: true,
    })
    updatedAt: Date = null;

    @ManyToOne(() => Category, category => category.items)
    @JoinColumn({ name: 'categoryId' })
    category: Category;

    @OneToMany(() => ItemSize, itemSize => itemSize.item)
    itemSizes: ItemSize[];

    @OneToMany(() => Like, like => like.item)
    likes: Like[];

    @OneToMany(() => Review, review => review.item)
    reviews: Review[];
}
