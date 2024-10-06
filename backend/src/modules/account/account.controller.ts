import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Account } from '../../entities';
import { AccountService } from './account.service';
import { AuthGuard } from '../../common/guards/auth.guard';
// import { CurrentAccount } from '../../common/decorator/currentAccount.decorator';
import { RoleGuard } from '../../common/guards/role.guard';

@Controller('accounts')
export class AccountController {
    constructor(private readonly accountService: AccountService) { }

    @Post()
    async create(@Body() requestBody: any): Promise<Account> {
        return this.accountService.create(requestBody);
    }

    @Get()
    @UseGuards(new RoleGuard(['admin', 'staff']))
    @UseGuards(AuthGuard)
    getListAccount() {
        // getListAccount(@CurrentAccount() currentAccount: Account) {
        // console.log(currentAccount);
        return this.accountService.findAll();
    }
}
