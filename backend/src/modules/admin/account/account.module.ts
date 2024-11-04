import { Module } from '@nestjs/common';
import { AdminAccountService } from './account.service';
import { AdminAccountController } from './account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '../../../entities';
import { AuthGuard } from '../../../common/guards/auth.guard';
import { AccountService } from '../../../modules/account/account.service';
import { UploadService } from '../../../modules/upload/upload.service';

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  providers: [AuthGuard, AdminAccountService, AccountService, UploadService],
  controllers: [AdminAccountController],
})
export class AdminAccountModule {}
