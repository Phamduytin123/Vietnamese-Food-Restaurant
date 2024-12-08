import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Put,
  UploadedFile,
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
import { LoggingInterceptor } from '../../common/interceptors';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from '../upload/upload.service';
import { PasswordUpdateDto } from './dtos/passwordUpdateDto';

@Controller('accounts')
@UseInterceptors(LoggingInterceptor)
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly uploadService: UploadService
  ) {}

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
  @Put('/update')
  @UseInterceptors(FileInterceptor('image'))
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(
    new RoleGuard([
      AccountRoleEnum.STAFF,
      AccountRoleEnum.CUSTOMER,
      AccountRoleEnum.ADMIN,
    ])
  )
  @UseGuards(AuthGuard)
  async UpdateInforAccount(
    @UploadedFile() file: Express.Multer.File,
    @CurrentAccount() currentAccount: Account,
    @Body() updateAccount: AccountUpdateDto
  ) {
    let image = null;

    if (file) {
      const cloudImage = await this.uploadService.uploadImage(file);
      image = cloudImage.url;
    }

    return this.accountService.updateAccount(
      currentAccount,
      updateAccount,
      image
    );
  }

  @Put('/changePassword')
  @UseGuards(AuthGuard)
  async changePassword(
    @CurrentAccount() currentAccount: Account,
    @Body() passwordRequest: PasswordUpdateDto,
    @Lang() lang: string
  ) {
    console.log(passwordRequest.currentPassword);

    return this.accountService.updatePassword(
      currentAccount,
      passwordRequest,
      lang
    );
  }
}
