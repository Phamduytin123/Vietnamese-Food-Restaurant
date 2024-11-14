import { Seeder } from 'typeorm-extension';
import { OrderDetail } from '../../entities';
import { DataSource } from 'typeorm';

export default class OrderDetailSeeder implements Seeder {
  private dataSource: DataSource;

  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
  }

  public async run(): Promise<void> {
    const orderDetailRepo = this.dataSource.getRepository(OrderDetail);

    for(var i = 1; i < 19; i++){
      await orderDetailRepo.save([
        {
          itemSizeId : 1,
          price : 25000,
          quantity : 2,
          orderId : i,
        },
        {
          itemSizeId : 4,
          price : 30000,
          quantity : 2,
          orderId : i,
        },
        {
          itemSizeId : 8,
          price : 40000,
          quantity : 2,
          orderId : i,
        },
      ]);
    }

    console.log('Seed data order detail created');
  }
}
