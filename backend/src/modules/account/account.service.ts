import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from '../../entities';

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(Account)
        private readonly accountRepo: Repository<Account>
    ) {}

    async findAll(): Promise<Account[]> {
        return this.accountRepo.find();
    }

    async create(requestBody: any): Promise<Account> {
        const { email, password, name } = requestBody;

        const newAccount = {
            email: email,
            password: password,
            name: name,
        };

        const account = this.accountRepo.create(newAccount);
        return this.accountRepo.save(account);
    }
}
