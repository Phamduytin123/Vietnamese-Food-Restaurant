import { ItemAvailabilityEnum } from '../common';
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
import { LikeItem } from './like.entity';
import { Review } from './review.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  name_vi: string;

  @Column({
    nullable: true,
  })
  name_en: string;

  @Column({
    default: 0,
  })
  discount: number;

  @Column({
    nullable: true,
  })
  calories: number;

  @Column({
    nullable: true,
  })
  fat: number;

  @Column({
    nullable: true,
  })
  carbohydrates: number;

  @Column({
    nullable: true,
  })
  protein: number;

  @Column({
    nullable: true,
  })
  cholesterol: number;

  @Column({
    nullable: true,
  })
  sodium: number;

  @Column({
    nullable: true,
  })
  fiber: number;

  @Column({
    nullable: true,
  })
  description_vi: string;

  @Column({
    nullable: true,
  })
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
    nullable: true,
  })
  ingredients_vi: string;

  @Column({
    type: 'varchar',
    default: '[]',
    length: 1000,
    nullable: true,
  })
  ingredients_en: string;

  @Column({
    nullable: true,
  })
  unit_vi: string;

  @Column({
    nullable: true,
  })
  unit_en: string;

  @Column({
    type: 'varchar',
    length: 1000,
  })
  images: string;

  @Column({
    nullable: true,
  })
  regional_vi: string;

  @Column({
    nullable: true,
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
  updatedAt: Date;

  @ManyToOne(() => Category, category => category.items)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @OneToMany(() => ItemSize, itemSize => itemSize.item)
  itemSizes: ItemSize[];

  @OneToMany(() => LikeItem, like => like.item)
  likes: LikeItem[];
}
