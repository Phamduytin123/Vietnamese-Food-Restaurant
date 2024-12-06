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
  @UseInterceptors(FilesInterceptor('images', 3))
  async updateItem(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: UpdateItemReq
  ) {
    const imagesLink = [];

    // Duyệt qua từng file và upload
    for (const file of files) {
      const result = await this.uploadService.uploadImage(file);
      imagesLink.push(result.url);
    }

    return this.adminItemService.updateItem(imagesLink, body);
  }

  @Post()
  @UseGuards(new RoleGuard([AccountRoleEnum.ADMIN, AccountRoleEnum.STAFF]))
  @UseGuards(AuthGuard)
  @UseInterceptors(FilesInterceptor('images', 3))
  async createItem(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: CreateItemReq
  ) {
    const imagesLink = [];

    // Duyệt qua từng file và upload
    for (const file of files) {
      const result = await this.uploadService.uploadImage(file);
      imagesLink.push(result.url);
    }

    return this.adminItemService.createItem(imagesLink, body);
  }
}
