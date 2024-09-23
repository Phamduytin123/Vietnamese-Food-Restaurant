import { Seeder } from 'typeorm-extension';
import { Item } from '../../entities';
import { DataSource } from 'typeorm';

const foodData = require('./food_data.json')

export default class FoodSeeder implements Seeder {
    private dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this.dataSource = dataSource;
    }

    public async run(): Promise<void> {
        const foodRepo = this.dataSource.getRepository(Item);

        await foodRepo.save(foodData);

        console.log('Seed data food created');
    }
}
