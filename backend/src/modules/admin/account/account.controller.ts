import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AdminAccountService } from './account.service';
import { RoleGuard } from '../../../common/guards/role.guard';
import { AccountRoleEnum, Lang } from '../../../common';
import { AuthGuard } from '../../../common/guards/auth.guard';
import { SearchAccount } from './dtos/searchAccount.request';
import { UpdateAccount } from './dtos/updateAccount.request';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from '../../../modules/upload/upload.service';
import { CreateAccount } from './dtos/createAccount.request';

@Controller('admin/accounts')
export class AdminAccountController {
  constructor(
    private readonly accountService: AdminAccountService,
    private readonly uploadService: UploadService
  ) { }
  @Get()
  @UseGuards(new RoleGuard([AccountRoleEnum.ADMIN, AccountRoleEnum.STAFF]))
  @UseGuards(AuthGuard)
  getAccounts(@Query() query: SearchAccount) {
    return this.accountService.getAccounts(query);
  }

  @Put()
  @UseGuards(new RoleGuard([AccountRoleEnum.ADMIN, AccountRoleEnum.STAFF]))
  @UseGuards(AuthGuard)
  updateAccount(@Body() body: UpdateAccount) {
    return this.accountService.updateAccount(body);
  }
  @Post()
  @UseGuards(new RoleGuard([AccountRoleEnum.ADMIN, AccountRoleEnum.STAFF]))
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  async createStaffAccount(
    @Body() body: CreateAccount,
    @UploadedFile() file: Express.Multer.File
  ) {
    let avatar =
      'https://res.cloudinary.com/deei5izfg/image/upload/v1726983197/VietnameseFoodRestaurant/skohr4qgffuyanefqy91.jpg';
    if (file) {
      const result = await this.uploadService.uploadImage(file);
      avatar = result.url;
    }
    return this.accountService.createAccount(body, avatar);
  }
  @Get('/:id')
  @UseGuards(new RoleGuard([AccountRoleEnum.ADMIN]))
  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  getAccountById(@Param('id') id: number) {
    return this.accountService.findById(id);
  }
}
