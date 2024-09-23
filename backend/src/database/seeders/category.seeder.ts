import { Seeder } from 'typeorm-extension';
import { Category } from '../../entities';
import { DataSource } from 'typeorm';

const categoryData = [
    // food
    { id: 1, name_vi: 'Bánh', name_en: 'Cake', isFood: true },
    { id: 2, name_vi: 'Bún', name_en: 'Vermicelli', isFood: true },
    { id: 3, name_vi: 'Mì', name_en: 'Noodles', isFood: true },
    { id: 4, name_vi: 'Cơm', name_en: 'Rice', isFood: true },
    { id: 5, name_vi: 'Cháo', name_en: 'Porridge', isFood: true },
    { id: 6, name_vi: 'Món ăn kèm', name_en: 'Side dish', isFood: true },
    { id: 7, name_vi: 'Món khác', name_en: 'Other dishes', isFood: true },
    // drink
    {
        id: 8,
        name_vi: 'Nước trái cây',
        name_en: 'Fresh fruit juice',
        isFood: false,
    },
    { id: 9, name_vi: 'Trà', name_en: 'Tea', isFood: false },
    { id: 10, name_vi: 'Nước ngọt', name_en: 'Soft drinks', isFood: false },
    { id: 11, name_vi: 'Sinh tố', name_en: 'Smoothies', isFood: false },
    { id: 12, name_vi: 'Rượu vang', name_en: 'Wine', isFood: false },
    { id: 13, name_vi: 'Bia', name_en: 'Beer', isFood: false },
    { id: 14, name_vi: 'Cocktail', name_en: 'Cocktail', isFood: false },
    { id: 15, name_vi: 'Cà phê', name_en: 'Coffee', isFood: false },
    { id: 16, name_vi: 'Trà sữa', name_en: 'Milk tea', isFood: false },
    {
        id: 17,
        name_vi: 'Nước uống khác',
        name_en: 'Other beverages',
        isFood: false,
    },
];

export default class CategorySeeder implements Seeder {
    private dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this.dataSource = dataSource;
    }

    public async run(): Promise<void> {
        const categoryRepo = this.dataSource.getRepository(Category);

        await categoryRepo.save(categoryData);

        console.log('Seed data category created');
    }
}
