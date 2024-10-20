import { VoucherService } from './voucher.service';
import { Controller, Get } from '@nestjs/common';

@Controller('vouchers')
export class VoucherController {
    constructor(private readonly voucherService: VoucherService){}

    @Get('/valid/')
    async validVouchers(){
        return this.voucherService.getValidVoucher()
    }
}
