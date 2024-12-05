import { Review } from '../../entities';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { faker } from '@faker-js/faker';

export default class ReviewSeeder implements Seeder {
  private dataSource: DataSource;

  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
  }

  public async run(): Promise<void> {
    const reviews: Partial<Review>[] = [];

    for (let j = 1; j < 180; j += 3) {
      const itemId = j;
      const itemSizeId = itemId; // Lấy itemSize đầu tiên tương ứng với mỗi item

      for (let i = 0; i < 20; i++) {
        const accountId = Math.floor(Math.random() * 3) + 1;
        const orderId = Math.floor(Math.random() * 12) + 1;

        const review: Partial<Review> = {
          rating: Math.floor(Math.random() * 5) + 1,
          comment: faker.lorem.sentences().substring(0, 254),
          itemSizeId: itemSizeId,
          orderId: orderId,
          accountId: accountId,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        reviews.push(review);
      }
    }

    const reviewRepo = this.dataSource.getRepository(Review);

    await reviewRepo.save(reviews);

    console.log('Seed data reviews created');
  }
}
