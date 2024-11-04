import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { AdminOrderService } from './order.service';
import { AuthGuard } from '../../../common/guards/auth.guard';
import { RoleGuard } from '../../../common/guards/role.guard';
import { AccountRoleEnum, Lang } from '../../../common';
import { AdminOrdersRequest } from './dtos/adminOrderRequest';

@Controller('/admin/orders')
export class AdminOrderController {
  constructor(private readonly adminOrderSerview: AdminOrderService) {}

  @Get()
  @UseGuards(new RoleGuard([AccountRoleEnum.ADMIN, AccountRoleEnum.STAFF]))
  @UseGuards(AuthGuard)
  getListOrder(@Query() query: AdminOrdersRequest, @Lang() lang: string) {
    return this.adminOrderSerview.getListOrder(query, lang);
  }

  @Get('/:id')
  @UseGuards(new RoleGuard([AccountRoleEnum.ADMIN, AccountRoleEnum.STAFF]))
  @UseGuards(AuthGuard)
  getOrderDetail(@Param('id') id: number, @Lang() lang: string) {
    return this.adminOrderSerview.getOrderDetail(id, lang);
  }
}
