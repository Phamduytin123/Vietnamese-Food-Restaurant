import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AdminVoucherService } from './voucher.service';
import { AuthGuard } from '../../../common/guards/auth.guard';
import { RoleGuard } from '../../../common/guards/role.guard';
import { AccountRoleEnum, Lang } from '../../../common';

@Controller('/admin/vouchers')
export class AdminVoucherController {
  constructor(private readonly voucherService: AdminVoucherService) {}

  @Get()
  @UseGuards(new RoleGuard([AccountRoleEnum.ADMIN, AccountRoleEnum.STAFF]))
  @UseGuards(AuthGuard)
  getAllVoucher(@Query() query: any, @Lang() lang: string) {
    return this.voucherService.getVoucher(query, lang);
  }
}
