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

        for (let j = 1; j < 66; j++) {
            for (let i = 0; i < 20; i++) {
                const itemId = j;
                const accountId = Math.floor(Math.random() * 3) + 1;

                const review: Partial<Review> = {
                    rating: Math.floor(Math.random() * 5) + 1,
                    comment: faker.lorem.sentences().substring(0, 900),
                    itemId: itemId,
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
