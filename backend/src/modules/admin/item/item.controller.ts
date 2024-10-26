import {
    Body,
    Controller,
    Post,
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

@Controller('/admin/items')
export class AdminItemController {
    constructor(
        private readonly adminItemService: AdminItemService,
        private readonly uploadService: UploadService
    ) {}

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
