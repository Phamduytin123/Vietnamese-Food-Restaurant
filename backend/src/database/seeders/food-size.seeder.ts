import { ItemSize } from '../../entities/item-size.entity';
import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';

const foodSizes = [
    // Bánh bèo
    { size_vi: 'Nhỏ', size_en: 'Small', price: 25, itemId: 1 },
    { size_vi: 'Vừa', size_en: 'Medium', price: 30, itemId: 1 },
    { size_vi: 'Lớn', size_en: 'Large', price: 35, itemId: 1 },

    // Bánh bột lọc
    { size_vi: 'Nhỏ', size_en: 'Small', price: 30, itemId: 2 },
    { size_vi: 'Vừa', size_en: 'Medium', price: 35, itemId: 2 },
    { size_vi: 'Lớn', size_en: 'Large', price: 40, itemId: 2 },

    // Bánh canh
    { size_vi: 'Nhỏ', size_en: 'Small', price: 35, itemId: 3 },
    { size_vi: 'Vừa', size_en: 'Medium', price: 40, itemId: 3 },
    { size_vi: 'Lớn', size_en: 'Large', price: 45, itemId: 3 },

    // Bánh chưng
    { size_vi: 'Nhỏ', size_en: 'Small', price: 60, itemId: 4 },
    { size_vi: 'Vừa', size_en: 'Medium', price: 65, itemId: 4 },
    { size_vi: 'Lớn', size_en: 'Large', price: 70, itemId: 4 },

    // Bánh cu đơ
    { size_vi: 'Nhỏ', size_en: 'Small', price: 10, itemId: 5 },
    { size_vi: 'Vừa', size_en: 'Medium', price: 15, itemId: 5 },
    { size_vi: 'Lớn', size_en: 'Large', price: 20, itemId: 5 },

    // Bánh cuốn
    { size_vi: 'Nhỏ', size_en: 'Small', price: 25, itemId: 6 },
    { size_vi: 'Vừa', size_en: 'Medium', price: 30, itemId: 6 },
    { size_vi: 'Lớn', size_en: 'Large', price: 35, itemId: 6 },

    // Bánh đúc
    { size_vi: 'Nhỏ', size_en: 'Small', price: 15, itemId: 7 },
    { size_vi: 'Vừa', size_en: 'Medium', price: 20, itemId: 7 },
    { size_vi: 'Lớn', size_en: 'Large', price: 25, itemId: 7 },

    // Bánh đậu xanh
    { size_vi: 'Nhỏ', size_en: 'Small', price: 10, itemId: 8 },
    { size_vi: 'Vừa', size_en: 'Medium', price: 15, itemId: 8 },
    { size_vi: 'Lớn', size_en: 'Large', price: 20, itemId: 8 },

    // Bánh giò
    { size_vi: 'Nhỏ', size_en: 'Small', price: 20, itemId: 9 },
    { size_vi: 'Vừa', size_en: 'Medium', price: 25, itemId: 9 },
    { size_vi: 'Lớn', size_en: 'Large', price: 30, itemId: 9 },

    // Bánh khọt
    { size_vi: 'Nhỏ', size_en: 'Small', price: 25, itemId: 10 },
    { size_vi: 'Vừa', size_en: 'Medium', price: 30, itemId: 10 },
    { size_vi: 'Lớn', size_en: 'Large', price: 35, itemId: 10 },

    // Bánh mì
    { size_vi: 'Nhỏ', size_en: 'Small', price: 15, itemId: 11 },
    { size_vi: 'Vừa', size_en: 'Medium', price: 20, itemId: 11 },
    { size_vi: 'Lớn', size_en: 'Large', price: 25, itemId: 11 },

    // Bánh pía
    { size_vi: 'Nhỏ', size_en: 'Small', price: 30, itemId: 12 },
    { size_vi: 'Vừa', size_en: 'Medium', price: 35, itemId: 12 },
    { size_vi: 'Lớn', size_en: 'Large', price: 40, itemId: 12 },

    // Bánh tét
    { size_vi: 'Nhỏ', size_en: 'Small', price: 50, itemId: 13 },
    { size_vi: 'Vừa', size_en: 'Medium', price: 55, itemId: 13 },
    { size_vi: 'Lớn', size_en: 'Large', price: 60, itemId: 13 },

    // Bánh tráng nướng
    { size_vi: 'Nhỏ', size_en: 'Small', price: 20, itemId: 14 },
    { size_vi: 'Vừa', size_en: 'Medium', price: 25, itemId: 14 },
    { size_vi: 'Lớn', size_en: 'Large', price: 30, itemId: 14 },

    // Bánh xèo
    { size_vi: 'Nhỏ', size_en: 'Small', price: 30, itemId: 15 },
    { size_vi: 'Vừa', size_en: 'Medium', price: 35, itemId: 15 },
    { size_vi: 'Lớn', size_en: 'Large', price: 40, itemId: 15 },

    // Bánh bò
    { size_vi: 'Nhỏ', size_en: 'Small', price: 15, itemId: 16 },
    { size_vi: 'Vừa', size_en: 'Medium', price: 20, itemId: 16 },
    { size_vi: 'Lớn', size_en: 'Large', price: 25, itemId: 16 },

    // Bánh cống
    { size_vi: 'Nhỏ', size_en: 'Small', price: 10, itemId: 17 },
    { size_vi: 'Vừa', size_en: 'Medium', price: 15, itemId: 17 },
    { size_vi: 'Lớn', size_en: 'Large', price: 20, itemId: 17 },

    // Bánh da lợn
    { size_vi: 'Nhỏ', size_en: 'Small', price: 20, itemId: 18 },
    { size_vi: 'Vừa', size_en: 'Medium', price: 25, itemId: 18 },
    { size_vi: 'Lớn', size_en: 'Large', price: 30, itemId: 18 },

    // Bánh tai heo
    { size_vi: 'Nhỏ', size_en: 'Small', price: 10, itemId: 19 },
    { size_vi: 'Vừa', size_en: 'Medium', price: 15, itemId: 19 },
    { size_vi: 'Lớn', size_en: 'Large', price: 20, itemId: 19 },

    // Bánh tiêu
    { size_vi: 'Nhỏ', size_en: 'Small', price: 5, itemId: 20 },
    { size_vi: 'Vừa', size_en: 'Medium', price: 10, itemId: 20 },
    { size_vi: 'Lớn', size_en: 'Large', price: 15, itemId: 20 },

    // Bánh trung thu
    { size_vi: 'Nhỏ', size_en: 'Small', price: 80, itemId: 21 },
    { size_vi: 'Vừa', size_en: 'Medium', price: 85, itemId: 21 },
    { size_vi: 'Lớn', size_en: 'Large', price: 90, itemId: 21 },

    // Bún bò Huế
    { size_vi: 'Nhỏ', size_en: 'Small', price: 40, itemId: 22 },
    { size_vi: 'Vừa', size_en: 'Medium', price: 45, itemId: 22 },
    { size_vi: 'Lớn', size_en: 'Large', price: 50, itemId: 22 },

    // Bún đậu mắm tôm
    { size_vi: 'Nhỏ', size_en: 'Small', price: 35, itemId: 23 },
    { size_vi: 'Vừa', size_en: 'Medium', price: 40, itemId: 23 },
    { size_vi: 'Lớn', size_en: 'Large', price: 45, itemId: 23 },

    // Bún mắm
    { size_vi: 'Nhỏ', size_en: 'Small', price: 40, itemId: 24 },
    { size_vi: 'Vừa', size_en: 'Medium', price: 45, itemId: 24 },
    { size_vi: 'Lớn', size_en: 'Large', price: 50, itemId: 24 },

    // Bún riêu
    { size_vi: 'Nhỏ', size_en: 'Small', price: 35, itemId: 25 },
    { size_vi: 'Vừa', size_en: 'Medium', price: 40, itemId: 25 },
    { size_vi: 'Lớn', size_en: 'Large', price: 45, itemId: 25 },

    // Bún thịt nướng
    { size_vi: 'Nhỏ', size_en: 'Small', price: 35, itemId: 26 },
    { size_vi: 'Vừa', size_en: 'Medium', price: 40, itemId: 26 },
    { size_vi: 'Lớn', size_en: 'Large', price: 45, itemId: 26 },

    // Cá kho tộ
    { size_vi: 'Nhỏ', size_en: 'Small', price: 50, itemId: 27 },
    { size_vi: 'Vừa', size_en: 'Medium', price: 55, itemId: 27 },
    { size_vi: 'Lớn', size_en: 'Large', price: 60, itemId: 27 },

    // Canh chua
    { size_vi: 'Nhỏ', size_en: 'Small', price: 35, itemId: 28 },
    { size_vi: 'Vừa', size_en: 'Medium', price: 40, itemId: 28 },
    { size_vi: 'Lớn', size_en: 'Large', price: 45, itemId: 28 },

    // Cao lầu
    { size_vi: 'Nhỏ', size_en: 'Small', price: 45, itemId: 29 },
    { size_vi: 'Vừa', size_en: 'Medium', price: 50, itemId: 29 },
    { size_vi: 'Lớn', size_en: 'Large', price: 55, itemId: 29 },

    // Cháo lòng
    { size_vi: 'Nhỏ', size_en: 'Small', price: 30, itemId: 30 },
    { size_vi: 'Vừa', size_en: 'Medium', price: 35, itemId: 30 },
    { size_vi: 'Lớn', size_en: 'Large', price: 40, itemId: 30 },

    // Cơm tấm
    { size_vi: 'Nhỏ', size_en: 'Small', price: 40, itemId: 31 },
    { size_vi: 'Vừa', size_en: 'Medium', price: 45, itemId: 31 },
    { size_vi: 'Lớn', size_en: 'Large', price: 50, itemId: 31 },

    // Cơm cháy
    { size_vi: 'Nhỏ', size_en: 'Small', price: 20, itemId: 32 },
    { size_vi: 'Vừa', size_en: 'Medium', price: 25, itemId: 32 },
    { size_vi: 'Lớn', size_en: 'Large', price: 30, itemId: 32 },

    // Gỏi cuốn
    { size_vi: 'Nhỏ', size_en: 'Small', price: 5, itemId: 33 },
    { size_vi: 'Vừa', size_en: 'Medium', price: 10, itemId: 33 },
    { size_vi: 'Lớn', size_en: 'Large', price: 15, itemId: 33 },

    // Hủ tiếu
    { size_vi: 'Nhỏ', size_en: 'Small', price: 35, itemId: 34 },
    { size_vi: 'Vừa', size_en: 'Medium', price: 40, itemId: 34 },
    { size_vi: 'Lớn', size_en: 'Large', price: 45, itemId: 34 },

    // Mì Quảng
    { size_vi: 'Nhỏ', size_en: 'Small', price: 40, itemId: 35 },
    { size_vi: 'Vừa', size_en: 'Medium', price: 45, itemId: 35 },
    { size_vi: 'Lớn', size_en: 'Large', price: 50, itemId: 35 },

    // Nem chua
    { size_vi: 'Nhỏ', size_en: 'Small', price: 10, itemId: 36 },
    { size_vi: 'Vừa', size_en: 'Medium', price: 15, itemId: 36 },
    { size_vi: 'Lớn', size_en: 'Large', price: 20, itemId: 36 },

    // Nem nướng
    { size_vi: 'Nhỏ', size_en: 'Small', price: 30, itemId: 37 },
    { size_vi: 'Vừa', size_en: 'Medium', price: 35, itemId: 37 },
    { size_vi: 'Lớn', size_en: 'Large', price: 40, itemId: 37 },

    // Phở
    { size_vi: 'Nhỏ', size_en: 'Small', price: 40, itemId: 38 },
    { size_vi: 'Vừa', size_en: 'Medium', price: 45, itemId: 38 },
    { size_vi: 'Lớn', size_en: 'Large', price: 50, itemId: 38 },

    // Xôi xéo
    { size_vi: 'Nhỏ', size_en: 'Small', price: 20, itemId: 39 },
    { size_vi: 'Vừa', size_en: 'Medium', price: 25, itemId: 39 },
    { size_vi: 'Lớn', size_en: 'Large', price: 30, itemId: 39 },
];

export default class FoodSizeSeeder implements Seeder {
    private dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this.dataSource = dataSource;
    }

    public async run(): Promise<void> {
        const foodSizeRepo = this.dataSource.getRepository(ItemSize);

        await foodSizeRepo.save(foodSizes);

        console.log('Seed data food size created');
    }
}
