import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { AdminVoucherService } from './voucher.service';
import { AuthGuard } from '../../../common/guards/auth.guard';
import { RoleGuard } from '../../../common/guards/role.guard';
import { AccountRoleEnum, Lang } from '../../../common';
import type { UpdateVoucherDto } from './dtos/updateVoucher.request';
import { CreateVoucherDto } from './dtos/createVoucher.request';
import { LoggingInterceptor } from '../../../common/interceptors';

@Controller('/admin/vouchers')
@UseInterceptors(LoggingInterceptor)
export class AdminVoucherController {
  constructor(private readonly voucherService: AdminVoucherService) { }

  @Get()
  @UseGuards(new RoleGuard([AccountRoleEnum.ADMIN, AccountRoleEnum.STAFF]))
  @UseGuards(AuthGuard)
  getAllVoucher(@Query() query: any, @Lang() lang: string) {
    return this.voucherService.getVoucher(query, lang);
  }

  @Put()
  @UseGuards(new RoleGuard([AccountRoleEnum.ADMIN, AccountRoleEnum.STAFF]))
  @UseGuards(AuthGuard)
  async updateVoucher(@Body() body: UpdateVoucherDto, @Lang() lang: string) {
    return this.voucherService.updateVoucher(body, lang);
  }

  @Post()
  @UseGuards(new RoleGuard([AccountRoleEnum.ADMIN]))
  @UseGuards(AuthGuard)
  async createVoucher(@Body() body: CreateVoucherDto, @Lang() lang: string) {
    return this.voucherService.createVoucher(body, lang);
  }

  @Delete(':id')
  @UseGuards(new RoleGuard([AccountRoleEnum.ADMIN, AccountRoleEnum.STAFF]))
  @UseGuards(AuthGuard)
  async deleteVoucher(@Param('id') id: number) {
      return this.voucherService.deleteVoucher(id);
  }

}
