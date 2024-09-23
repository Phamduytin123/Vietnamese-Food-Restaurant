import { Seeder } from 'typeorm-extension';
import { Account } from '../../entities';
import { DataSource } from 'typeorm';
import { AccountGenderEnum } from '../../common/enums/account-gender.enum';
import { PasswordUtils } from '../../common/utils/password.utils';
import { AccountRoleEnum } from '../../common/enums/account-role.enum';

const accountData = [
    {
        name: 'Nguyen Van Dung',
        displayName: 'NVDung',
        address: '111 Phan Thanh, Thac Gian, Thanh Khe, Da Nang',
        email: 'dung@gmail.com',
        tel: '1234567890',
        gender: AccountGenderEnum.MALE,
        password: PasswordUtils.hashPassword('12345678'),
        role: AccountRoleEnum.CUSTOMER,
    },
    {
        name: 'Le Tuan Nguyen Khoi',
        displayName: 'NKhoi',
        address: '111 Phan Thanh, Thac Gian, Thanh Khe, Da Nang',
        email: 'khoi@gmail.com',
        tel: '1234567890',
        gender: AccountGenderEnum.MALE,
        password: PasswordUtils.hashPassword('12345678'),
        role: AccountRoleEnum.ADMIN,
    },
    {
        name: 'Pham Duy Tin',
        displayName: 'DTin',
        address: '111 Phan Thanh, Thac Gian, Thanh Khe, Da Nang',
        email: 'tin@gmail.com',
        tel: '1234567890',
        gender: AccountGenderEnum.MALE,
        password: PasswordUtils.hashPassword('12345678'),
        role: AccountRoleEnum.STAFF,
    },
    {
        name: 'Nguyen Hoang Nhat Minh',
        displayName: 'NMinh',
        address: '111 Phan Thanh, Thac Gian, Thanh Khe, Da Nang',
        email: 'minh@gmail.com',
        tel: '1234567890',
        gender: AccountGenderEnum.MALE,
        password: PasswordUtils.hashPassword('12345678'),
        role: AccountRoleEnum.STAFF,
    },
];

export default class AccountSeeder implements Seeder {
    private dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this.dataSource = dataSource;
    }

    public async run(): Promise<void> {
        const accountRepo = this.dataSource.getRepository(Account);

        await accountRepo.save(accountData);

        console.log('Seed data account created');
    }
}
