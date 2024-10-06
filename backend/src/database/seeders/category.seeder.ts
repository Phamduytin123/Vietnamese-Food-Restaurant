import { Seeder } from 'typeorm-extension';
import { Category } from '../../entities';
import { DataSource } from 'typeorm';

const categoryData = [
    // food
    {
        id: 1,
        name_vi: 'Bánh',
        name_en: 'Cake',
        url: 'https://res.cloudinary.com/deei5izfg/image/upload/v1727077384/VietnameseFoodRestaurant/Food/banh_beo/vgmg2pc2bxlgocctobrp.jpg',
        isFood: true,
    },
    {
        id: 2,
        name_vi: 'Bún',
        name_en: 'Vermicelli',
        url: 'https://res.cloudinary.com/deei5izfg/image/upload/v1727077489/VietnameseFoodRestaurant/Food/cao_lau/pv6kp90up7thoksvnpa9.jpg',
        isFood: true,
    },
    {
        id: 3,
        name_vi: 'Mì',
        name_en: 'Noodles',
        url: 'https://res.cloudinary.com/deei5izfg/image/upload/v1727077513/VietnameseFoodRestaurant/Food/mi_quang/nefkr0sd1nkcldgskfhx.jpg',
        isFood: true,
    },
    {
        id: 4,
        name_vi: 'Cơm',
        name_en: 'Rice',
        url: 'https://res.cloudinary.com/deei5izfg/image/upload/v1727077498/VietnameseFoodRestaurant/Food/broken_rice/fmulqphn5rcvup6afxas.jpg',
        isFood: true,
    },
    {
        id: 5,
        name_vi: 'Cháo',
        name_en: 'Porridge',
        url: 'https://res.cloudinary.com/deei5izfg/image/upload/v1727077494/VietnameseFoodRestaurant/Food/liver_porridge/pfvhdjqahnolfv5wpspo.jpg',
        isFood: true,
    },
    {
        id: 6,
        name_vi: 'Món ăn kèm',
        name_en: 'Side dish',
        url: 'https://res.cloudinary.com/deei5izfg/image/upload/v1727077483/VietnameseFoodRestaurant/Food/braised_fish/diap4wae49mnupynwfwp.jpg',
        isFood: true,
    },
    {
        id: 7,
        name_vi: 'Món khác',
        name_en: 'Other dishes',
        url: 'https://res.cloudinary.com/deei5izfg/image/upload/v1727077524/VietnameseFoodRestaurant/Food/pho/i2fgz6szipfq1npbb23y.jpg',
        isFood: true,
    },
    // drink
    {
        id: 8,
        name_vi: 'Nước trái cây',
        name_en: 'Fresh fruit juice',
        url: 'https://res.cloudinary.com/deei5izfg/image/upload/v1727019975/VietnameseFoodRestaurant/Drink/Orange%20Juice/mv3uyggpdwrt7dv4pzju.png',
        isFood: false,
    },
    {
        id: 9,
        name_vi: 'Trà',
        name_en: 'Tea',
        url: 'https://res.cloudinary.com/deei5izfg/image/upload/v1727019981/VietnameseFoodRestaurant/Drink/GreenTea/cj2tslnyoh1fey7ph4bt.jpg',
        isFood: false,
    },
    {
        id: 10,
        name_vi: 'Nước ngọt',
        name_en: 'Soft drinks',
        url: 'https://res.cloudinary.com/deei5izfg/image/upload/v1727019981/VietnameseFoodRestaurant/Drink/Coca/uxh9tzibwbhrqqshiulr.jpg',
        isFood: false,
    },
    {
        id: 11,
        name_vi: 'Sinh tố',
        name_en: 'Smoothies',
        url: 'https://res.cloudinary.com/deei5izfg/image/upload/v1727019979/VietnameseFoodRestaurant/Drink/Avocado%20Smoothie/kbnp7cabrwwkz9oin5m2.jpg',
        isFood: false,
    },
    {
        id: 12,
        name_vi: 'Rượu vang',
        name_en: 'Wine',
        url: 'https://res.cloudinary.com/deei5izfg/image/upload/v1727019977/VietnameseFoodRestaurant/Drink/RedWine/vucakgfxl7xd5gwborbt.jpg',
        isFood: false,
    },
    {
        id: 13,
        name_vi: 'Bia',
        name_en: 'Beer',
        url: 'https://res.cloudinary.com/deei5izfg/image/upload/v1727019982/VietnameseFoodRestaurant/Drink/Heniken/huxboukg01zmbfbr6kv4.jpg',
        isFood: false,
    },
    {
        id: 14,
        name_vi: 'Cocktail',
        name_en: 'Cocktail',
        url: 'https://res.cloudinary.com/deei5izfg/image/upload/v1727019974/VietnameseFoodRestaurant/Drink/Mojito/c3uvmnofp8hwvltgounn.jpg',
        isFood: false,
    },
    {
        id: 15,
        name_vi: 'Cà phê',
        name_en: 'Coffee',
        url: 'https://res.cloudinary.com/deei5izfg/image/upload/v1727019981/VietnameseFoodRestaurant/Drink/EggCoffee/lmdb8lkgjgyxmtbjfk8z.jpg',
        isFood: false,
    },
    {
        id: 16,
        name_vi: 'Trà sữa',
        name_en: 'Milk tea',
        url: 'https://res.cloudinary.com/deei5izfg/image/upload/v1727019978/VietnameseFoodRestaurant/Drink/Traditional%20Milk%20Tea/axfgtbwu7nqpreayudvq.jpg',
        isFood: false,
    },
    {
        id: 17,
        name_vi: 'Nước uống khác',
        name_en: 'Other beverages',
        url: 'https://res.cloudinary.com/deei5izfg/image/upload/v1727019975/VietnameseFoodRestaurant/Drink/CoconutWater/ccbsitrbh32jbbfdkkt3.jpg',
        isFood: false,
    },
];

export default class CategorySeeder implements Seeder {
    private dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this.dataSource = dataSource;
    }

    public async run(): Promise<void> {
        const categoryRepo = this.dataSource.getRepository(Category);

        await categoryRepo.save(categoryData);

        console.log('Seed data category created');
    }
}
