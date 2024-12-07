import {
  Body,
  Controller,
  Post,
  Put,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AdminItemService } from './item.service';
import { AuthGuard } from '../../../common/guards/auth.guard';
import { RoleGuard } from '../../../common/guards/role.guard';
import { AccountRoleEnum } from '../../../common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from '../../../modules/upload/upload.service';
import { CreateItemReq } from './dtos/createItemReq';
import { UpdateItemReq } from './dtos/updateItem.request';
import { LoggingInterceptor } from '../../../common/interceptors';

@Controller('/admin/items')
@UseInterceptors(LoggingInterceptor)
export class AdminItemController {
  constructor(
    private readonly adminItemService: AdminItemService,
    private readonly uploadService: UploadService
  ) {}
  @Put()
  @UseGuards(new RoleGuard([AccountRoleEnum.ADMIN, AccountRoleEnum.STAFF]))
  @UseGuards(AuthGuard)
  @UseInterceptors(FilesInterceptor('formData', 5))
  async updateItem(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: UpdateItemReq
  ) {
    return this.adminItemService.updateItem(body);
  }

  @Post()
  @UseGuards(new RoleGuard([AccountRoleEnum.ADMIN, AccountRoleEnum.STAFF]))
  @UseGuards(AuthGuard)
  @UseInterceptors(FilesInterceptor('formData', 5))
  async createItem(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: CreateItemReq
  ) {
    return this.adminItemService.createItem(body);
  }
}
