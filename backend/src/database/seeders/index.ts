// src/seeds/index.ts
import { DataSource } from 'typeorm';
import AccountSeeder from './account.seeder';
import * as entities from '../../entities';
import * as dotenv from 'dotenv';
import CategorySeeder from './category.seeder';
import FoodSeeder from './food.seeder';
import FoodSizeSeeder from './food-size.seeder';
import DrinkSeeder from './drink.seeder';
import DrinkSizeSeeder from './drink-size.seeder';

dotenv.config();

async function runSeeders() {
    const dataSource = new DataSource({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: Object.values(entities),
    });

    await dataSource.initialize();

    const seeders = [
        new AccountSeeder(dataSource),
        new CategorySeeder(dataSource),
        new FoodSeeder(dataSource),
        new FoodSizeSeeder(dataSource),
        new DrinkSeeder(dataSource),
        new DrinkSizeSeeder(dataSource),
    ];

    for (const seeder of seeders) {
        await seeder.run();
    }

    // Đóng kết nối
    await dataSource.destroy();
    console.log('All seeders completed');
}

runSeeders().catch(error => console.error(error));
