import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Account } from '../../entities';
import { AccountService } from './account.service';
// import { CurrentAccount } from '../../common/decorator/currentAccount.decorator';
import { AccountRoleEnum } from '../../common';
import { RoleGuard } from '../../common/guards/role.guard';
import { AuthGuard } from '../../common/guards/auth.guard';

@Controller('accounts')
export class AccountController {
    constructor(private readonly accountService: AccountService) { }

    @Post()
    async create(@Body() requestBody: any): Promise<Account> {
        return this.accountService.create(requestBody);
    }

    @Get()
    // @UseGuards(new RoleGuard(['admin', 'staff']))
    @UseGuards(new RoleGuard([AccountRoleEnum.STAFF, AccountRoleEnum.ADMIN]))
    @UseGuards(AuthGuard)
    getListAccount() {
        // getListAccount(@CurrentAccount() currentAccount: Account) {
        // console.log(currentAccount);
        return this.accountService.findAll();
    }
}
