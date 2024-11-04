import { Module } from '@nestjs/common';
import { AdminVoucherService } from './voucher.service';
import { AdminVoucherController } from './voucher.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account, Voucher } from '../../../entities';
import { AuthGuard } from '../../../common/guards/auth.guard';
import { AccountService } from '../../../modules/account/account.service';

@Module({
  imports: [TypeOrmModule.forFeature([Voucher, Account])],
  providers: [AdminVoucherService, AuthGuard, AccountService],
  controllers: [AdminVoucherController],
})
export class AdminVoucherModule {}
