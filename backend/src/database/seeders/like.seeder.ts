import { Seeder } from 'typeorm-extension';
import { Like } from '../../entities';
import { DataSource } from 'typeorm';

const likeDate = [
    {
        accountId : 1,
        itemId: 1,
    },
    {
        accountId : 1,
        itemId: 2,
    },
    {
        accountId : 1,
        itemId: 3,
    },
    {
        accountId : 1,
        itemId: 4,
    },
    {
        accountId : 1,
        itemId: 5,
    },
    {
        accountId : 2,
        itemId: 6,
    },
    {
        accountId : 2,
        itemId: 2,
    },
    {
        accountId : 2,
        itemId: 3,
    }
]

export default class LikeSeeder implements Seeder {
    private dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this.dataSource = dataSource;
    }

    public async run(): Promise<void> {
        const likeRepo = this.dataSource.getRepository(Like);

        await likeRepo.save(likeDate);

        console.log('Seed data like created');
    }
}
