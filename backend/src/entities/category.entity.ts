import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Item } from './item.entity';

@Entity()
export class Category {
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
    default:
      'https://res.cloudinary.com/deei5izfg/image/upload/v1728210344/VietnameseFoodRestaurant/default_category.png',
  })
  url: String;

  @Column()
  isFood: boolean;

  @OneToMany(() => Item, item => item.category, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  items: Item[];
}
