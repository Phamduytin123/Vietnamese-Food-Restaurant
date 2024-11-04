import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Item } from './item.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name_vi: string;

  @Column()
  name_en: string;

  @Column({
    default:
      'https://res.cloudinary.com/deei5izfg/image/upload/v1728210344/VietnameseFoodRestaurant/default_category.png',
  })
  url: String;

  @Column()
  isFood: boolean;

  @OneToMany(() => Item, item => item.category)
  items: Item[];
}
