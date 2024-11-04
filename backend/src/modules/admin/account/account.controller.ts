import { Body, Controller, Get, Put, Query, UseGuards } from '@nestjs/common';
import { AdminAccountService } from './account.service';
import { RoleGuard } from '../../../common/guards/role.guard';
import { AccountRoleEnum } from '../../../common';
import { AuthGuard } from '../../../common/guards/auth.guard';
import { SearchAccount } from './dtos/searchAccount.request';
import { UpdateAccount } from './dtos/updateAccount.request';

@Controller('admin/accounts')
export class AdminAccountController {
  constructor(private readonly accountService: AdminAccountService) {}

  @Get()
    @UseGuards(new RoleGuard([AccountRoleEnum.ADMIN, AccountRoleEnum.STAFF]))
    @UseGuards(AuthGuard)
    getAccounts (@Query() query : SearchAccount){
      return this.accountService.getAccounts(query);
    }
    @Put()
    @UseGuards(new RoleGuard([AccountRoleEnum.ADMIN, AccountRoleEnum.STAFF]))
    @UseGuards(AuthGuard)
    updateAccount(@Body() body : UpdateAccount){
      return this.accountService.updateAccount(body)
    }
}
