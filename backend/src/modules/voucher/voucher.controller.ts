import { Lang } from '../../common';
import { VoucherService } from './voucher.service';
import { Controller, Get } from '@nestjs/common';

@Controller('vouchers')
export class VoucherController {
  constructor(private readonly voucherService: VoucherService) {}

  @Get('/valid/')
  async validVouchers(@Lang() lang: string) {
    return this.voucherService.getValidVoucher(lang);
  }
}
