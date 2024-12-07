import { ItemSize } from '../../entities/item-size.entity';
import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';

const foodSizes = [
  // Bánh bèo
  { size_vi: 'Nhỏ', size_en: 'Small', price: 25000, itemId: 1 },
  { size_vi: 'Vừa', size_en: 'Medium', price: 30000, itemId: 1 },
  { size_vi: 'Lớn', size_en: 'Large', price: 35000, itemId: 1 },

  // Bánh bột lọc
  { size_vi: 'Nhỏ', size_en: 'Small', price: 30000, itemId: 2 },
  { size_vi: 'Vừa', size_en: 'Medium', price: 35000, itemId: 2 },
  { size_vi: 'Lớn', size_en: 'Large', price: 40000, itemId: 2 },

  // Bánh canh
  { size_vi: 'Nhỏ', size_en: 'Small', price: 35000, itemId: 3 },
  { size_vi: 'Vừa', size_en: 'Medium', price: 40000, itemId: 3 },
  { size_vi: 'Lớn', size_en: 'Large', price: 45000, itemId: 3 },

  // Bánh chưng
  { size_vi: 'Nhỏ', size_en: 'Small', price: 60000, itemId: 4 },
  { size_vi: 'Vừa', size_en: 'Medium', price: 65000, itemId: 4 },
  { size_vi: 'Lớn', size_en: 'Large', price: 70000, itemId: 4 },

  // Bánh cu đơ
  { size_vi: 'Nhỏ', size_en: 'Small', price: 10000, itemId: 5 },
  { size_vi: 'Vừa', size_en: 'Medium', price: 15000, itemId: 5 },
  { size_vi: 'Lớn', size_en: 'Large', price: 20000, itemId: 5 },

  // Bánh cuốn
  { size_vi: 'Nhỏ', size_en: 'Small', price: 25000, itemId: 6 },
  { size_vi: 'Vừa', size_en: 'Medium', price: 30000, itemId: 6 },
  { size_vi: 'Lớn', size_en: 'Large', price: 35000, itemId: 6 },

  // Bánh đúc
  { size_vi: 'Nhỏ', size_en: 'Small', price: 15000, itemId: 7 },
  { size_vi: 'Vừa', size_en: 'Medium', price: 20000, itemId: 7 },
  { size_vi: 'Lớn', size_en: 'Large', price: 25000, itemId: 7 },

  // Bánh đậu xanh
  { size_vi: 'Nhỏ', size_en: 'Small', price: 10000, itemId: 8 },
  { size_vi: 'Vừa', size_en: 'Medium', price: 15000, itemId: 8 },
  { size_vi: 'Lớn', size_en: 'Large', price: 20000, itemId: 8 },

  // Bánh giò
  { size_vi: 'Nhỏ', size_en: 'Small', price: 20000, itemId: 9 },
  { size_vi: 'Vừa', size_en: 'Medium', price: 25000, itemId: 9 },
  { size_vi: 'Lớn', size_en: 'Large', price: 30000, itemId: 9 },

  // Bánh khọt
  { size_vi: 'Nhỏ', size_en: 'Small', price: 25000, itemId: 10 },
  { size_vi: 'Vừa', size_en: 'Medium', price: 30000, itemId: 10 },
  { size_vi: 'Lớn', size_en: 'Large', price: 35000, itemId: 10 },

  // Bánh mì
  { size_vi: 'Nhỏ', size_en: 'Small', price: 15000, itemId: 11 },
  { size_vi: 'Vừa', size_en: 'Medium', price: 20000, itemId: 11 },
  { size_vi: 'Lớn', size_en: 'Large', price: 25000, itemId: 11 },

  // Bánh pía
  { size_vi: 'Nhỏ', size_en: 'Small', price: 30000, itemId: 12 },
  { size_vi: 'Vừa', size_en: 'Medium', price: 35000, itemId: 12 },
  { size_vi: 'Lớn', size_en: 'Large', price: 40000, itemId: 12 },

  // Bánh tét
  { size_vi: 'Nhỏ', size_en: 'Small', price: 50000, itemId: 13 },
  { size_vi: 'Vừa', size_en: 'Medium', price: 55000, itemId: 13 },
  { size_vi: 'Lớn', size_en: 'Large', price: 60000, itemId: 13 },

  // Bánh tráng nướng
  { size_vi: 'Nhỏ', size_en: 'Small', price: 20000, itemId: 14 },
  { size_vi: 'Vừa', size_en: 'Medium', price: 25000, itemId: 14 },
  { size_vi: 'Lớn', size_en: 'Large', price: 30000, itemId: 14 },

  // Bánh xèo
  { size_vi: 'Nhỏ', size_en: 'Small', price: 30000, itemId: 15 },
  { size_vi: 'Vừa', size_en: 'Medium', price: 35000, itemId: 15 },
  { size_vi: 'Lớn', size_en: 'Large', price: 40000, itemId: 15 },

  // Bánh bò
  { size_vi: 'Nhỏ', size_en: 'Small', price: 15000, itemId: 16 },
  { size_vi: 'Vừa', size_en: 'Medium', price: 20000, itemId: 16 },
  { size_vi: 'Lớn', size_en: 'Large', price: 25000, itemId: 16 },

  // Bánh cống
  { size_vi: 'Nhỏ', size_en: 'Small', price: 10000, itemId: 17 },
  { size_vi: 'Vừa', size_en: 'Medium', price: 15000, itemId: 17 },
  { size_vi: 'Lớn', size_en: 'Large', price: 20000, itemId: 17 },

  // Bánh da lợn
  { size_vi: 'Nhỏ', size_en: 'Small', price: 20000, itemId: 18 },
  { size_vi: 'Vừa', size_en: 'Medium', price: 25000, itemId: 18 },
  { size_vi: 'Lớn', size_en: 'Large', price: 30000, itemId: 18 },

  // Bánh tai heo
  { size_vi: 'Nhỏ', size_en: 'Small', price: 10000, itemId: 19 },
  { size_vi: 'Vừa', size_en: 'Medium', price: 15000, itemId: 19 },
  { size_vi: 'Lớn', size_en: 'Large', price: 20000, itemId: 19 },

  // Bánh tiêu
  { size_vi: 'Nhỏ', size_en: 'Small', price: 5000, itemId: 20 },
  { size_vi: 'Vừa', size_en: 'Medium', price: 10000, itemId: 20 },
  { size_vi: 'Lớn', size_en: 'Large', price: 15000, itemId: 20 },

  // Bánh trung thu
  { size_vi: 'Nhỏ', size_en: 'Small', price: 80000, itemId: 21 },
  { size_vi: 'Vừa', size_en: 'Medium', price: 85000, itemId: 21 },
  { size_vi: 'Lớn', size_en: 'Large', price: 90000, itemId: 21 },

  // Bún bò Huế
  { size_vi: 'Nhỏ', size_en: 'Small', price: 40000, itemId: 22 },
  { size_vi: 'Vừa', size_en: 'Medium', price: 45000, itemId: 22 },
  { size_vi: 'Lớn', size_en: 'Large', price: 50000, itemId: 22 },

  // Bún đậu mắm tôm
  { size_vi: 'Nhỏ', size_en: 'Small', price: 35000, itemId: 23 },
  { size_vi: 'Vừa', size_en: 'Medium', price: 40000, itemId: 23 },
  { size_vi: 'Lớn', size_en: 'Large', price: 45000, itemId: 23 },

  // Bún mắm
  { size_vi: 'Nhỏ', size_en: 'Small', price: 40000, itemId: 24 },
  { size_vi: 'Vừa', size_en: 'Medium', price: 45000, itemId: 24 },
  { size_vi: 'Lớn', size_en: 'Large', price: 50000, itemId: 24 },

  // Bún riêu
  { size_vi: 'Nhỏ', size_en: 'Small', price: 35000, itemId: 25 },
  { size_vi: 'Vừa', size_en: 'Medium', price: 40000, itemId: 25 },
  { size_vi: 'Lớn', size_en: 'Large', price: 45000, itemId: 25 },

  // Bún thịt nướng
  { size_vi: 'Nhỏ', size_en: 'Small', price: 35000, itemId: 26 },
  { size_vi: 'Vừa', size_en: 'Medium', price: 40000, itemId: 26 },
  { size_vi: 'Lớn', size_en: 'Large', price: 45000, itemId: 26 },

  // Cá kho tộ
  { size_vi: 'Nhỏ', size_en: 'Small', price: 50000, itemId: 27 },
  { size_vi: 'Vừa', size_en: 'Medium', price: 55000, itemId: 27 },
  { size_vi: 'Lớn', size_en: 'Large', price: 60000, itemId: 27 },

  // Canh chua
  { size_vi: 'Nhỏ', size_en: 'Small', price: 35000, itemId: 28 },
  { size_vi: 'Vừa', size_en: 'Medium', price: 40000, itemId: 28 },
  { size_vi: 'Lớn', size_en: 'Large', price: 45000, itemId: 28 },

  // Cao lầu
  { size_vi: 'Nhỏ', size_en: 'Small', price: 45000, itemId: 29 },
  { size_vi: 'Vừa', size_en: 'Medium', price: 50000, itemId: 29 },
  { size_vi: 'Lớn', size_en: 'Large', price: 55000, itemId: 29 },

  // Cháo lòng
  { size_vi: 'Nhỏ', size_en: 'Small', price: 30000, itemId: 30 },
  { size_vi: 'Vừa', size_en: 'Medium', price: 35000, itemId: 30 },
  { size_vi: 'Lớn', size_en: 'Large', price: 40000, itemId: 30 },

  // Cơm tấm
  { size_vi: 'Nhỏ', size_en: 'Small', price: 40000, itemId: 31 },
  { size_vi: 'Vừa', size_en: 'Medium', price: 45000, itemId: 31 },
  { size_vi: 'Lớn', size_en: 'Large', price: 50000, itemId: 31 },

  // Cơm cháy
  { size_vi: 'Nhỏ', size_en: 'Small', price: 20000, itemId: 32 },
  { size_vi: 'Vừa', size_en: 'Medium', price: 25000, itemId: 32 },
  { size_vi: 'Lớn', size_en: 'Large', price: 30000, itemId: 32 },

  // Gỏi cuốn
  { size_vi: 'Nhỏ', size_en: 'Small', price: 5000, itemId: 33 },
  { size_vi: 'Vừa', size_en: 'Medium', price: 10000, itemId: 33 },
  { size_vi: 'Lớn', size_en: 'Large', price: 15000, itemId: 33 },

  // Hủ tiếu
  { size_vi: 'Nhỏ', size_en: 'Small', price: 35000, itemId: 34 },
  { size_vi: 'Vừa', size_en: 'Medium', price: 40000, itemId: 34 },
  { size_vi: 'Lớn', size_en: 'Large', price: 45000, itemId: 34 },

  // Mì Quảng
  { size_vi: 'Nhỏ', size_en: 'Small', price: 40000, itemId: 35 },
  { size_vi: 'Vừa', size_en: 'Medium', price: 45000, itemId: 35 },
  { size_vi: 'Lớn', size_en: 'Large', price: 50000, itemId: 35 },

  // Nem chua
  { size_vi: 'Nhỏ', size_en: 'Small', price: 10000, itemId: 36 },
  { size_vi: 'Vừa', size_en: 'Medium', price: 15000, itemId: 36 },
  { size_vi: 'Lớn', size_en: 'Large', price: 20000, itemId: 36 },

  // Nem nướng
  { size_vi: 'Nhỏ', size_en: 'Small', price: 30000, itemId: 37 },
  { size_vi: 'Vừa', size_en: 'Medium', price: 35000, itemId: 37 },
  { size_vi: 'Lớn', size_en: 'Large', price: 40000, itemId: 37 },

  // Phở
  { size_vi: 'Nhỏ', size_en: 'Small', price: 40000, itemId: 38 },
  { size_vi: 'Vừa', size_en: 'Medium', price: 45000, itemId: 38 },
  { size_vi: 'Lớn', size_en: 'Large', price: 50000, itemId: 38 },

  // Xôi xéo
  { size_vi: 'Nhỏ', size_en: 'Small', price: 20000, itemId: 39 },
  { size_vi: 'Vừa', size_en: 'Medium', price: 25000, itemId: 39 },
  { size_vi: 'Lớn', size_en: 'Large', price: 30000, itemId: 39 },
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
