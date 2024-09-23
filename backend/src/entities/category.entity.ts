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

    @Column()
    isFood: boolean;

    @OneToMany(() => Item, item => item.category)
    items: Item[];
}
