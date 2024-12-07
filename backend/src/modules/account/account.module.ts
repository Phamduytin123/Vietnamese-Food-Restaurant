import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '../../entities';
import { AuthGuard } from '../../common/guards/auth.guard';
import { UploadService } from '../upload/upload.service';

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  providers: [AuthGuard, AccountService, UploadService],
  controllers: [AccountController],
  exports: [AccountService],
})
export class AccountModule { }
