import { Seeder } from 'typeorm-extension';
import { ItemSize } from '../../entities';
import { DataSource } from 'typeorm';

const drinkSizeData = [
    // Nước Cam (Orange Juice)
    { size_vi: 'Ly Nhỏ', size_en: 'Small Glass', price: 30000, itemId: 41 },
    { size_vi: 'Ly Vừa', size_en: 'Medium Glass', price: 32000, itemId: 41 },
    { size_vi: 'Ly Lớn', size_en: 'Large Glass', price: 35000, itemId: 41 },

    // Nước Dứa (Pineapple Juice)
    { size_vi: 'Ly Nhỏ', size_en: 'Small Glass', price: 35000, itemId: 42 },
    { size_vi: 'Ly Vừa', size_en: 'Medium Glass', price: 37000, itemId: 42 },
    { size_vi: 'Ly Lớn', size_en: 'Large Glass', price: 40000, itemId: 42 },

    // Nước Dưa Hấu (Watermelon Juice)
    { size_vi: 'Ly Nhỏ', size_en: 'Small Glass', price: 30000, itemId: 43 },
    { size_vi: 'Ly Vừa', size_en: 'Medium Glass', price: 32000, itemId: 43 },
    { size_vi: 'Ly Lớn', size_en: 'Large Glass', price: 35000, itemId: 43 },

    // Nước Ép Bưởi (Grapefruit Juice)
    { size_vi: 'Ly Nhỏ', size_en: 'Small Glass', price: 35000, itemId: 44 },
    { size_vi: 'Ly Vừa', size_en: 'Medium Glass', price: 37000, itemId: 44 },
    { size_vi: 'Ly Lớn', size_en: 'Large Glass', price: 40000, itemId: 44 },

    // Trà Xanh (Green Tea)
    { size_vi: 'Ly Nhỏ', size_en: 'Small Glass', price: 25000, itemId: 45 },
    { size_vi: 'Ly Vừa', size_en: 'Medium Glass', price: 27000, itemId: 45 },
    { size_vi: 'Ly Lớn', size_en: 'Large Glass', price: 30000, itemId: 45 },

    // Trà Đen (Black Tea)
    { size_vi: 'Ly Nhỏ', size_en: 'Small Glass', price: 25000, itemId: 46 },
    { size_vi: 'Ly Vừa', size_en: 'Medium Glass', price: 27000, itemId: 46 },
    { size_vi: 'Ly Lớn', size_en: 'Large Glass', price: 30000, itemId: 46 },

    // Trà Thảo Mộc (Herbal Tea)
    { size_vi: 'Ly Nhỏ', size_en: 'Small Glass', price: 30000, itemId: 47 },
    { size_vi: 'Ly Vừa', size_en: 'Medium Glass', price: 32000, itemId: 47 },
    { size_vi: 'Ly Lớn', size_en: 'Large Glass', price: 35000, itemId: 47 },

    // Coca-Cola
    { size_vi: '330ml', size_en: '330ml', price: 20000, itemId: 48 },

    // 7up
    { size_vi: '330ml', size_en: '330ml', price: 20000, itemId: 49 },

    // Sinh Tố Bơ (Avocado Smoothie)
    { size_vi: 'Ly Nhỏ', size_en: 'Small Glass', price: 40000, itemId: 50 },
    { size_vi: 'Ly Vừa', size_en: 'Medium Glass', price: 42000, itemId: 50 },
    { size_vi: 'Ly Lớn', size_en: 'Large Glass', price: 45000, itemId: 50 },

    // Sinh Tố Dứa (Pineapple Smoothie)
    { size_vi: 'Ly Nhỏ', size_en: 'Small Glass', price: 45000, itemId: 51 },
    { size_vi: 'Ly Vừa', size_en: 'Medium Glass', price: 47000, itemId: 51 },
    { size_vi: 'Ly Lớn', size_en: 'Large Glass', price: 50000, itemId: 51 },

    // Rượu Vang Đỏ (Red Wine)
    { size_vi: 'Ly Nhỏ', size_en: 'Small Glass', price: 150000, itemId: 52 },
    { size_vi: 'Ly Vừa', size_en: 'Medium Glass', price: 152000, itemId: 52 },
    { size_vi: 'Ly Lớn', size_en: 'Large Glass', price: 155000, itemId: 52 },

    // Rượu Vang Trắng (White Wine)
    { size_vi: 'Ly Nhỏ', size_en: 'Small Glass', price: 150000, itemId: 53 },
    { size_vi: 'Ly Vừa', size_en: 'Medium Glass', price: 152000, itemId: 53 },
    { size_vi: 'Ly Lớn', size_en: 'Large Glass', price: 155000, itemId: 53 },

    // Bia Heineken (Heineken Beer)
    { size_vi: '250ml', size_en: '250ml', price: 30000, itemId: 54 },

    // Bia Larual (Larual Beer)
    { size_vi: '330ml', size_en: '330ml', price: 35000, itemId: 55 },

    // Mojito
    { size_vi: 'Ly Nhỏ', size_en: 'Small Glass', price: 80000, itemId: 56 },
    { size_vi: 'Ly Vừa', size_en: 'Medium Glass', price: 82000, itemId: 56 },
    { size_vi: 'Ly Lớn', size_en: 'Large Glass', price: 85000, itemId: 56 },

    // Margarita
    { size_vi: 'Ly Nhỏ', size_en: 'Small Glass', price: 80000, itemId: 57 },
    { size_vi: 'Ly Vừa', size_en: 'Medium Glass', price: 82000, itemId: 57 },
    { size_vi: 'Ly Lớn', size_en: 'Large Glass', price: 85000, itemId: 57 },

    // Cà Phê Đen (Black Coffee)
    { size_vi: 'Ly Nhỏ', size_en: 'Small Cup', price: 25000, itemId: 58 },
    { size_vi: 'Ly Vừa', size_en: 'Medium Cup', price: 27000, itemId: 58 },
    { size_vi: 'Ly Lớn', size_en: 'Large Cup', price: 30000, itemId: 58 },

    // Cà Phê Sữa (Milk Coffee)
    { size_vi: 'Ly Nhỏ', size_en: 'Small Cup', price: 30000, itemId: 59 },
    { size_vi: 'Ly Vừa', size_en: 'Medium Cup', price: 32000, itemId: 59 },
    { size_vi: 'Ly Lớn', size_en: 'Large Cup', price: 35000, itemId: 59 },

    // Cà Phê Trứng (Egg Coffee)
    { size_vi: 'Ly Nhỏ', size_en: 'Small Cup', price: 40000, itemId: 60 },
    { size_vi: 'Ly Vừa', size_en: 'Medium Cup', price: 42000, itemId: 60 },
    { size_vi: 'Ly Lớn', size_en: 'Large Cup', price: 45000, itemId: 60 },

    // Trà Sữa Truyền Thống (Traditional Milk Tea)
    { size_vi: 'Ly Nhỏ', size_en: 'Small Glass', price: 35000, itemId: 61 },
    { size_vi: 'Ly Vừa', size_en: 'Medium Glass', price: 37000, itemId: 61 },
    { size_vi: 'Ly Lớn', size_en: 'Large Glass', price: 40000, itemId: 62 },

    // Trà Sữa Socola (Socol Milk Tea)
    { size_vi: 'Ly Nhỏ', size_en: 'Small Glass', price: 40000, itemId: 62 },
    { size_vi: 'Ly Vừa', size_en: 'Medium Glass', price: 42000, itemId: 62 },
    { size_vi: 'Ly Lớn', size_en: 'Large Glass', price: 45000, itemId: 62 },

    // Trà Sữa Matcha (Matcha Milk Tea)
    { size_vi: 'Ly Nhỏ', size_en: 'Small Glass', price: 45000, itemId: 63 },
    { size_vi: 'Ly Vừa', size_en: 'Medium Glass', price: 47000, itemId: 63 },
    { size_vi: 'Ly Lớn', size_en: 'Large Glass', price: 50000, itemId: 63 },

    // Nước Lọc (Water)
    { size_vi: '355ml', size_en: '355ml', price: 10000, itemId: 64 },

    // Nước Dừa (Coconut Water)
    { size_vi: 'Ly Nhỏ', size_en: 'Small Glass', price: 30000, itemId: 65 },
    { size_vi: 'Ly Vừa', size_en: 'Medium Glass', price: 32000, itemId: 65 },
    { size_vi: 'Ly Lớn', size_en: 'Large Glass', price: 35000, itemId: 65 },
];
export default class DrinkSizeSeeder implements Seeder {
    private dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this.dataSource = dataSource;
    }

    public async run(): Promise<void> {
        const drinkSizeRepo = this.dataSource.getRepository(ItemSize);

        await drinkSizeRepo.save(drinkSizeData);

        console.log('Seed data drink size created');
    }
}
