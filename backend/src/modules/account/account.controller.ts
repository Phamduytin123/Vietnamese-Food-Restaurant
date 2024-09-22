import { Body, Controller, Get, Post } from '@nestjs/common';
import { Account } from '../../entities';
import { AccountService } from './account.service';

@Controller('accounts')
export class AccountController {
    constructor(private readonly accountService: AccountService) {}

    @Post()
    async create(@Body() requestBody: any): Promise<Account> {
        return this.accountService.create(requestBody);
    }

    @Get()
    getListAccount() {
        return this.accountService.findAll();
    }
}
