import { Module } from '@nestjs/common';
import { VoucherController } from './voucher.controller';
import { VoucherService } from './voucher.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Voucher } from '../../entities';

@Module({
    imports: [TypeOrmModule.forFeature([Voucher])],
    controllers: [VoucherController],
    providers: [VoucherService],
})
export class VoucherModule {}
