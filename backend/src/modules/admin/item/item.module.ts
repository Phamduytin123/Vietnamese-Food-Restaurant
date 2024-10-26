import { Module } from '@nestjs/common';
import { AdminItemController } from './item.controller';
import { AdminItemService } from './item.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account, Category, Item, ItemSize } from '../../../entities';
import { UploadService } from '../../../modules/upload/upload.service';
import { AuthGuard } from '../../../common/guards/auth.guard';
import { AccountService } from '../../../modules/account/account.service';

@Module({
    imports: [TypeOrmModule.forFeature([Item, ItemSize, Account, Category])],
    controllers: [AdminItemController],
    providers: [AdminItemService, UploadService, AuthGuard, AccountService],
})
export class AdminItemModule {}
