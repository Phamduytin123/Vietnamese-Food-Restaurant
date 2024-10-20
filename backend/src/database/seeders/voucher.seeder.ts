import { Voucher } from '../../entities';
import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';

const vouchers = [
    {name_vi: "Tri ân khách hàng", name_en: "Customer appreciation", code: "TRIANKHACHHANG", discount: 15, minPrice: 200, startAt: new Date("2024-10-20"), endAt: new Date("2025-10-20"), count: 100},
    {name_vi: "Khuyến mãi mùa hè", name_en: "Summer promotion", code: "SUMMER2024", discount: 20, minPrice: 150, startAt: new Date("2024-06-01"), endAt: new Date("2025-08-31"), count: 200},
    {name_vi: "Mừng năm mới", name_en: "New Year celebration", code: "NEWYEAR2025", discount: 25, minPrice: 300, startAt: new Date("2025-01-01"), endAt: new Date("2025-01-31"), count: 50},
    {name_vi: "Ưu đãi mua sắm cuối tuần", name_en: "Weekend shopping offer", code: "WEEKENDSALE", discount: 15, minPrice: 100, startAt: new Date("2025-09-01"), endAt: new Date("2025-09-30"), count: 150},
    {name_vi: "Giảm giá sinh nhật", name_en: "Birthday discount", code: "BIRTHDAY2024", discount: 40, minPrice: 250, startAt: new Date("2024-11-01"), endAt: new Date("2025-11-30"), count: 75},
    {name_vi: "Ưu đãi lễ Quốc Khánh", name_en: "National Day promotion", code: "NATIONALDAY", discount: 35, minPrice: 220, startAt: new Date("2024-09-02"), endAt: new Date("2025-10-02"), count: 80}
];

export default class VoucherSeeder implements Seeder {
    private dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this.dataSource = dataSource;
    }

    public async run(): Promise<void> {
        const voucherRepo = this.dataSource.getRepository(Voucher);

        await voucherRepo.save(vouchers);

        console.log('Seed data voucher created');
    }
}
