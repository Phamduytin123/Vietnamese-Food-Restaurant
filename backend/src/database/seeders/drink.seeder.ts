import { Seeder } from 'typeorm-extension';
import { Item } from '../../entities';
import { DataSource } from 'typeorm';

const drinkData = require('./drink_data.json');

export default class DrinkSeeder implements Seeder {
  private dataSource: DataSource;

  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
  }

  public async run(): Promise<void> {
    const drinkRepo = this.dataSource.getRepository(Item);

    await drinkRepo.save(drinkData);

    console.log('Seed data drink created');
  }
}
