import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Account } from '../../entities';
import { AccountService } from './account.service';
// import { CurrentAccount } from '../../common/decorator/currentAccount.decorator';
import { AccountRoleEnum, CurrentAccount, Lang } from '../../common';
import { RoleGuard } from '../../common/guards/role.guard';
import { AuthGuard } from '../../common/guards/auth.guard';
import { AccountUpdateDto } from './dtos/accountUpdateDto';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

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

  @Get('/get-infor')
  @UseGuards(AuthGuard)
  GetInforAccount(@CurrentAccount() account: Account) {
    return account;
  }
  @Post('/update')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(
    new RoleGuard([
      AccountRoleEnum.STAFF,
      AccountRoleEnum.CUSTOMER,
      AccountRoleEnum.ADMIN,
    ])
  )
  @UseGuards(AuthGuard)
  UpdateInforAccount(
    @Lang() lang: string,
    @CurrentAccount() currentAccount: Account,
    @Body() updateAccount: AccountUpdateDto
  ) {
    return this.accountService.updateAccount(
      lang,
      currentAccount,
      updateAccount
    );
  }
}
